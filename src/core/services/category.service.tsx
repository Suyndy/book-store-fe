import api from "../config/api";

class CategoryService {
  async getAllCategory() {
    const res = await api.get("/categories");
    return res.data;
  }

  async saveCategory(data: any) {
    const res = await api.post("/categories", data);
    return res.data;
  }

  async deleteCategory(id: any) {
    const res = await api.delete(`/categories/${id}`);
    return res.data;
  }

  async updateCategory({ id, data }: any) {
    const res = await api.put(`/categories/${id}`, data);
    return res.data;
  }
}

// Correct export syntax
export const categoryService = new CategoryService();
