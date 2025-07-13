import { act, render, screen, waitFor } from "@testing-library/react-native";
import { useEffect } from "react";
import { Text } from "react-native";
import { useProducts } from "../useProducts";

const mockProducts = [
    { id: 1, title: 'A', price: 30, rating: 4.5, category: 'x' },
    { id: 2, title: 'B', price: 10, rating: 3.0, category: 'y' },
    { id: 3, title: 'C', price: 20, rating: 5.0, category: 'x' },
    { id: 4, title: 'D', price: 40, rating: 4.0, category: 'y' }
];

jest.mock('../../services/productService', () => ({
    __esModule: true,
    default: {
        getProducts: jest.fn()
    }
}));

const HookTester = ({ onReady }: { onReady?: (hookResult: ReturnType<typeof useProducts>) => void }) => {
    const hookResult = useProducts();

    useEffect(() => {
        if (!hookResult.loading && !hookResult.error && onReady) {
            onReady(hookResult);
        }
    }, [hookResult, onReady]);

    if (hookResult.loading) return <Text>Loading</Text>;
    if (hookResult.error) return <Text>Error</Text>;

    return (
        <>
            <Text>Ready</Text>
            <Text testID="productsCount">{hookResult.products.length}</Text>
        </>
    );
};

describe("useProducts", () => {
    const { default: ProductService } = require('../../services/productService');

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("loads products and sets loading", async () => {
        ProductService.getProducts.mockResolvedValueOnce({ products: mockProducts });

        render(<HookTester />);

        expect(screen.getByText("Loading")).toBeTruthy();

        await waitFor(() => {
            expect(screen.getByText("Ready")).toBeTruthy();
        });

        const count = screen.getByTestId("productsCount");
        expect(count.props.children).toBeLessThanOrEqual(4);
    });

    it("handles error", async () => {
        ProductService.getProducts.mockRejectedValueOnce(new Error('Failed'));

        render(<HookTester />);

        expect(screen.getByText("Loading")).toBeTruthy();

        const errorText = await screen.findByText("Error");
        expect(errorText).toBeTruthy();
    });

    it("sorts by price ascending", async () => {
        ProductService.getProducts.mockResolvedValueOnce({ products: mockProducts });

        let hookResult: ReturnType<typeof useProducts> | null = null;

        render(<HookTester onReady={hr => (hookResult = hr)} />);

        await waitFor(() => expect(hookResult).not.toBeNull());

        await act(()=>{
            hookResult!.setSortBy('price');
            hookResult!.setSortDirection('asc');
        })
        
        await waitFor(() => {
            const prices = hookResult!.products.map(p => p.price);
            expect(prices).toEqual([10, 20, 30, 40]);
        });
    });

    it("sorts by price descending", async () => {
        ProductService.getProducts.mockResolvedValueOnce({ products: mockProducts });

        let hookResult: ReturnType<typeof useProducts> | null = null;

        render(<HookTester onReady={hr => (hookResult = hr)} />);

        await waitFor(() => expect(hookResult).not.toBeNull());

        await act(()=>{
            hookResult!.setSortBy('price');
            hookResult!.setSortDirection('desc');
        })
        

        await waitFor(() => {
            const prices = hookResult!.products.map(p => p.price);
            expect(prices).toEqual([40, 30, 20, 10]);
        });
    });

    it("sorts by rating ascending", async () => {
        ProductService.getProducts.mockResolvedValueOnce({ products: mockProducts });

        let hookResult: ReturnType<typeof useProducts> | null = null;

        render(<HookTester onReady={hr => (hookResult = hr)} />);

        await waitFor(() => expect(hookResult).not.toBeNull());

        await act(()=>{
            hookResult!.setSortBy('rating');
            hookResult!.setSortDirection('asc');
        })
        
        await waitFor(() => {
            const prices = hookResult!.products.map(p => p.rating);
            expect(prices).toEqual([3.0, 4.0, 4.5, 5.0]);
        });
    });

    it("sorts by rating descending", async () => {
        ProductService.getProducts.mockResolvedValueOnce({ products: mockProducts });

        let hookResult: ReturnType<typeof useProducts> | null = null;

        render(<HookTester onReady={hr => (hookResult = hr)} />);

        await waitFor(() => expect(hookResult).not.toBeNull());

        await act(()=> {
            hookResult!.setSortBy('rating');
            hookResult!.setSortDirection('desc');
        })

        await waitFor(() => {
            const prices = hookResult!.products.map(p => p.rating);
            expect(prices).toEqual([5.0, 4.5, 4.0, 3.0]);
        });
    });

    it("sorts by category", async () => {
        ProductService.getProducts.mockResolvedValueOnce({ products: mockProducts });

        let hookResult: ReturnType<typeof useProducts> | null = null;

        render(<HookTester onReady={hr => (hookResult = hr)} />);

        await waitFor(() => expect(hookResult).not.toBeNull());

        await act(()=> {
            hookResult!.setSelectedCategory('x');
        })
        
        await waitFor(() => {
            const prices = hookResult!.products.map(p => p.title);
            expect(prices).toEqual(['A', 'C']);
        });
    });

    it("sorts by category price desc", async () => {
        ProductService.getProducts.mockResolvedValueOnce({ products: mockProducts });

        let hookResult: ReturnType<typeof useProducts> | null = null;

        render(<HookTester onReady={hr => (hookResult = hr)} />);

        await waitFor(() => expect(hookResult).not.toBeNull());

        await act(()=>{
            hookResult!.setSelectedCategory('x');
            hookResult!.setSortBy('price');
            hookResult!.setSortDirection('desc');
        })
        
        await waitFor(() => {
            const prices = hookResult!.products.map(p => p.title);
            expect(prices).toEqual(['A', 'C']);
        });
    });

    it("paginates correctly", async () => {
        const manyProducts = Array.from({length: 25}, (_,i) => ({
            id: i+1,
            title: `Product ${i}`,
            price: 10 + i,
            rating: 5,
            category: 'car'
        }));

        ProductService.getProducts.mockResolvedValueOnce({ products: manyProducts });

        let hookResult: ReturnType<typeof useProducts> | null = null;
        render(<HookTester onReady={hr => (hookResult = hr)} />);
        await waitFor(() => expect(hookResult).not.toBeNull());

        expect(hookResult!.products.length).toBe(20);
        expect(hookResult!.products[0].id).toBe(1);
        expect(hookResult!.products[19].id).toBe(20);
        expect(hookResult!.totalPages).toBe(2);

        await act(()=>{
            hookResult!.setCurrentPage(2);
        })

        await waitFor(() => {
            expect(hookResult!.products.length).toBe(5);
            expect(hookResult!.products[0].id).toBe(21);
            expect(hookResult!.products[4].id).toBe(25);
        });
    })
});
