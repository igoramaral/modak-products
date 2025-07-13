import { render, screen, waitFor } from "@testing-library/react-native";
import { Text } from "react-native";
import { useCategories } from "../useCategories";

const mockCategories = ['catA','catB','catC'];

jest.mock('../../services/productService', () => ({
    __esModule: true,
    default: {
        getCategories: jest.fn()
    }
}));

const HookTester = ({}: {}) => {
    const hookResult = useCategories();

    if (hookResult.loading) return <Text>Loading</Text>;
    if (hookResult.error) return <Text>Error</Text>;

    return (
        <>
            <Text>Ready</Text>
            <Text testID="categoriesCount">{hookResult.categories.length}</Text>
        </>
    );
};

describe("useCategories", () => {
    const { default: ProductService } = require('../../services/productService');

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("loads categories and sets loading", async () => {
        ProductService.getCategories.mockResolvedValueOnce(mockCategories);

        render(<HookTester />);

        expect(screen.getByText("Loading")).toBeTruthy();

        await waitFor(() => {
            expect(screen.getByText("Ready")).toBeTruthy();
        });

        const count = screen.getByTestId("categoriesCount");
        expect(count.props.children).toBeLessThanOrEqual(3);
    });

    it("handles error", async () => {
        ProductService.getCategories.mockRejectedValueOnce(new Error('Failed'));

        render(<HookTester />);

        expect(screen.getByText("Loading")).toBeTruthy();

        const errorText = await screen.findByText("Error");
        expect(errorText).toBeTruthy();
    });
});
