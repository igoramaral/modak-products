import { useEffect, useState } from "react";
import productService from "../services/productService";
import { Product } from "../types/product";

export function useProduct(id: number | string){
    const [product, setProduct] = useState<Product|null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(()=>{
        setLoading(true);
        productService.getProductById(id)
        .then((res) => {
            setProduct(res);
        }).catch((err)=>{
            setError(true);
        }).finally(()=>{
            setLoading(false);
        })
    }, [id]);

    return {
        product,
        loading,
        error
    }
}