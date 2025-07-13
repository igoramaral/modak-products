import { render, screen, waitFor } from "@testing-library/react-native";
import { Text } from "react-native";
import { useProduct } from "../useProduct";

const mockProduct = {
    title: 'Mock Product',
    id: 1,
    price: 10,
    rating: 4
};

jest.mock('../../services/productService', () => ({
    __esModule: true,
    default: {
        getProductById: jest.fn()
    }
}));

const HookTester = ({}: {}) => {
    const hookResult = useProduct(1);

    if (hookResult.loading) return <Text>Loading</Text>;
    if (hookResult.error) return <Text>Error</Text>;

    return (
        <>
            <Text>Ready</Text>
            <Text testID="productTitle">{hookResult.product?.title}</Text>
        </>
    );
};

describe("useProduct", () => {
    const { default: ProductService } = require('../../services/productService');

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("loads product and sets loading", async () => {
        ProductService.getProductById.mockResolvedValueOnce(mockProduct);

        render(<HookTester />);

        expect(screen.getByText("Loading")).toBeTruthy();

        await waitFor(() => {
            expect(screen.getByText("Ready")).toBeTruthy();
        });

        const productTitle = await screen.findByText("Mock Product");
        expect(productTitle).toBeTruthy();
    });

    it("handles error", async () => {
        ProductService.getProductById.mockRejectedValueOnce(new Error('Failed'));

        render(<HookTester />);

        expect(screen.getByText("Loading")).toBeTruthy();

        const errorText = await screen.findByText("Error");
        expect(errorText).toBeTruthy();
    });
});
