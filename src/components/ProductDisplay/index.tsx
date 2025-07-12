import { Product } from '@/src/types/product';
import React, { useRef } from 'react';
import { FlatList } from 'react-native';
import Pagination from '../Pagination';
import ProductCard from './ProductCard';

interface ProductDisplayProps {
    products: Product[];
    viewMode: string;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalPages: number;
}

export default function ProductDisplay({products, viewMode, currentPage, setCurrentPage, totalPages}:ProductDisplayProps) {

    const flatListRef = useRef<FlatList>(null);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    };

    return (
        <>
            <FlatList
                ref={flatListRef}
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <ProductCard item={item} viewMode={viewMode}/> }
                numColumns={viewMode === 'grid' ? 2 : 1}
                key={viewMode}
                contentContainerStyle={{
                    gap: 8,
                    padding: 8,
                }}
                columnWrapperStyle={
                    viewMode === 'grid' ? { justifyContent: 'space-between' } : undefined
                }
                ListFooterComponent={
                    <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                }
            />
        </>
    );
}