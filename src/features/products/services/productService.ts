import apiClient from "../../../shared/utils/apiClient";

export interface FilterParams {
    title?: string;
    price?: number;
    price_min?: number;
    price_max?: number;
    categoryId?: number;
}

export const getProducts = async (params?: FilterParams) => {
    const response = await apiClient.get("/products", { params });
    return response.data;
}

export const getProductById = async (id: string) => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
}

export const getCategories = async () => {
    const response = await apiClient.get("/categories");
    return response.data;
}