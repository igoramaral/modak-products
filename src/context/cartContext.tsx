import React, { createContext, ReactNode, useContext, useState } from "react";
import { Cart, CartProduct } from "../types/cart";
import { Product } from "../types/product";

interface CartContextType {
    cart: Cart;
    addProduct: (product: Product, quantity?: number) => void;
    removeProduct: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
}

const cartContext = createContext<CartContextType | undefined>(
    undefined
);

export const useCart = () => {
    const context = useContext(cartContext);
    if(context === undefined){
        throw new Error("useCart must be used within a CartProvider")
    }
    return context;
}

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({children,}) => {
    const [cart, setCart] = useState<Cart>({total: 0, products: []});

    const calculateTotal = (products: CartProduct[]): number => {
        return products.reduce(
            (sum, item) => sum + (item.product.price * item.quantity),
            0
        );
    };

    const addProduct = (product: Product, quantity: number = 1) => {
        setCart(prev => {
            const existing = prev.products.find(p => p.product.id === product.id);
            let updatedProducts: CartProduct[];

            if (existing) {
                updatedProducts = prev.products.map(p =>
                    p.product.id === product.id
                        ? { ...p, quantity: p.quantity + quantity }
                        : p
                );
            } else {
                updatedProducts = [...prev.products, { product, quantity }];
            }

            return {
                products: updatedProducts,
                total: calculateTotal(updatedProducts),
            };
        });
    };

    const removeProduct = (productId: number) => {
        setCart(prev => {
            const updatedProducts = prev.products.filter(
                p => p.product.id !== productId
            );
            return {
                products: updatedProducts,
                total: calculateTotal(updatedProducts),
            };
        });
    };

    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity <= 0) {
            removeProduct(productId);
            return;
        }

        setCart(prev => {
            const updatedProducts = prev.products.map(p =>
                p.product.id === productId ? { ...p, quantity } : p
            );
            return {
                products: updatedProducts,
                total: calculateTotal(updatedProducts),
            };
        });
    };

    const clearCart = () => {
        setCart({ products: [], total: 0 });
    };

    const value: CartContextType = {
        cart,
        addProduct,
        removeProduct,
        updateQuantity,
        clearCart,
    };

    return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
}