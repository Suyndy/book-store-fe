import api from "../config/api";

class LaptopService {
  async getAllLaptop({ name }: any) {
    const res = await api.get("/laptops", {
      params: { name }, // Thêm name vào query parameters
    });
    return res.data;
  }

  async deleteLaptop(id: any) {
    const res = await api.delete(`/laptops/${id}`);
    return res.data;
  }

  async getOptions() {
    const res = await api.get("/options");
    return res.data;
  }

  async createLaptop(data: any) {
    const res = await api.post("/laptops", data);
    return res.data;
  }

  async getOneLaptop(id: any) {
    const res = await api.get(`/laptops/${id}`);
    return res.data;
  }

  async updateLaptop({ id, data }: any) {
    const res = await api.put(`/laptops/${id}`, data);
    return res.data;
  }
}

// Correct export syntax
export const laptopService = new LaptopService();
