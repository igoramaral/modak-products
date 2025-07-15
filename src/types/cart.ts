import { Product } from "./product";

export interface CartProduct {
    quantity: number;
    product: Product;
}

export interface Cart {
    total: number;
    products: CartProduct[];
}