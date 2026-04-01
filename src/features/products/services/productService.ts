import apiClient from "../../../shared/utils/apiClient";

export const getPrducts = async () => {
    const response = await apiClient.get("/products");
    return response.data.products;
}

export const getProductById = async (id: string) => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
}