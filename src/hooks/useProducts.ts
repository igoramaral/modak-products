import { useEffect, useState } from 'react';
import ProductService from '../services/productService';
import { Product } from '../types/product';

export function useProducts() {
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<'price' | 'rating' | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const pageSize = 20;

    useEffect(() => {
        ProductService.getProducts()
        .then((res) => {
            setAllProducts(res.products);
        })
        .catch((err) => {
            console.error(err);
            setError(err);
        })
        .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        filterSortAndPaginate();
    }, [allProducts, selectedCategory, sortBy, sortDirection, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, sortBy, sortDirection]);

    function filterSortAndPaginate() {
        let filtered = [...allProducts];

        if (selectedCategory.length > 0) {
            filtered = filtered.filter((p) => selectedCategory.includes(p.category));
        }

        if (sortBy) {
            filtered.sort((a, b) => {
                const aValue = a[sortBy];
                const bValue = b[sortBy];

                if (typeof aValue === 'number' && typeof bValue === 'number') {
                    return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
                }
                return 0;
            });
        };

        const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
        setTotalPages(pages);

        if (currentPage > pages) {
            setCurrentPage(1);
            return;
        }

        const start = (currentPage - 1) * pageSize;
        const end = currentPage * pageSize;

        setDisplayedProducts(filtered.slice(start, end));
    }

    function setCategories(category:string) {
        setSelectedCategory(prev => {
            return prev.includes(category)
                ? prev.filter(item => item !== category)
                : [...prev, category]
        })
    }

    return {
        products: displayedProducts,
        loading,
        error,
        selectedCategory,
        setCategories,
        sortBy,
        setSortBy,
        sortDirection,
        setSortDirection,
        currentPage,
        setCurrentPage,
        totalPages
    };
}
