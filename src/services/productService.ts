import { AxiosInstance } from 'axios';
import { Product } from '../types/product';
import api from './api';

export interface ProductListResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

class ProductService {

    private api: AxiosInstance;

    constructor(){
        this.api = api;
    }

    async getProducts(): Promise<ProductListResponse> {
        const response = await this.api.get<ProductListResponse>('?limit=0');
        return response.data;
    }

    async getCategories(): Promise<string[]>{
        const response = await this.api.get<string[]>('/category-list');
        return response.data;
    }

    async getProductById(id: number | string): Promise<Product>{
        const response = await this.api.get<Product>(`/${id}`);
        return response.data;
    }
}

export default new ProductService();