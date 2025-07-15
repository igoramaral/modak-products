import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useCategories } from "../../hooks/useCategories";
import { useProducts } from "../../hooks/useProducts";
import DisplayOptionsBar from "../DisplayOptionsBar";
import FiltersBar from "../FiltersBar";
import ProductDisplay from "../ProductDisplay";

interface ProductListParams {
    initialCategory?: string
}

export default function ProductList({ initialCategory }:ProductListParams) {
    const {
        products,
        loading: loadingProducts,
        error: errorProducts,
        selectedCategory,
        setCategories,
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

    useEffect(() => {
        if (initialCategory) setCategories(initialCategory);
    }, [initialCategory]);

    const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');

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
        <View style={{ flex: 1, padding: 5 , marginVertical: 10}}>
            <FiltersBar 
                categories={categories} 
                selectedCategory={selectedCategory} 
                setSelectedCategory={setCategories} 
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
