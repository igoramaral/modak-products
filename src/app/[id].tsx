import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";
import { useProduct } from "../hooks/useProduct";

export default function Product() {
    const { id } = useLocalSearchParams();

    if (!id) {
        return <Text>Invalid Product</Text>;
    }
    const normalizedId = Array.isArray(id) ? id[0] : id;
    const { product, loading, error } = useProduct(normalizedId);

    if (loading) {
        return <ActivityIndicator size="large" />;
    }

    if (error || !product) {
        return <Text>Error loading Product. Please try again.</Text>;
    }

    return(
        <View>
            <Text>{product?.title}</Text>
        </View>
    )
}