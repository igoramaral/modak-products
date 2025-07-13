import { useEffect, useState } from "react";
import ProductService from "../services/productService";

export function useCategories() {
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        ProductService.getCategories()
            .then((res) => setCategories(res))
            .catch((err) => {
                console.error(err);
                setError(err);
            })
            .finally(() => setLoading(false));
    }, []);

    return { categories, loading, error };
}
