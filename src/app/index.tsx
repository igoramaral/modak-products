import { useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import DisplayOptionsBar from "../components/DisplayOptionsBar";
import FiltersBar from "../components/FiltersBar";
import ProductDisplay from "../components/ProductDisplay";
import { useCategories } from "../hooks/useCategories";
import { useProducts } from "../hooks/useProducts";

export default function Index() {
    const {
        products,
        loading: loadingProducts,
        error: errorProducts,
        selectedCategory,
        setSelectedCategory,
        sortBy,
        setSortBy,
        sortDirection,
        setSortDirection,
        currentPage,
        setCurrentPage,
        totalPages
    } = useProducts();

    const {
        categories,
        loading: loadingCategories,
        error: errorCategories
    } = useCategories();

    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

    if (loadingProducts || loadingCategories) {
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

    if (errorProducts || errorCategories) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text>Error loading Products. Please try again.</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <FiltersBar 
                categories={categories} 
                selectedCategory={selectedCategory} 
                setSelectedCategory={setSelectedCategory} 
            />

            <DisplayOptionsBar
                sortBy={sortBy} 
                setSortBy={setSortBy} 
                sortDirection={sortDirection} 
                setSortDirection={setSortDirection}
                viewMode={viewMode}
                setViewMode={setViewMode}
            />
            
            <ProductDisplay 
                viewMode={viewMode} 
                products={products}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages} 
            />
        </View>
    );
}
