import api from "../config/api";

class OrderService {
    async getAllOrder({ name }: any) {
        const res = await api.get("/orders", {
            params: { name }, // Thêm name vào query parameters
        });
        return res.data;
    }

    async getOneOrder(id: any) {
        const res = await api.get(`/order-details/${id}`);
        return res.data;
    }
}

export const orderService = new OrderService();