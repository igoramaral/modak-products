import { useCategories } from "@/src/hooks/useCategories";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";
import ProductList from "../../components/ProductList";

export default function Category() {
    const { category } = useLocalSearchParams();
    const {categories, loading, error} = useCategories();
    const normalizedCategory = Array.isArray(category) ? category[0] : category;

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error || !categories.includes(normalizedCategory)) {
        return (
            <View 
            style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text>
                    { error ?
                    "Error loading Product. Please try again." :
                    "Category not found. Please try again"
                    }
                </Text>
            </View>
        );
    }
    return (
        <ProductList initialCategory={normalizedCategory}/>
    )
}
