import api from "../config/api";

class BookService {
  async getAllBook(): Promise<any[]> {
    const res = await api.get("/books");
    return res.data;
  }

  async getOneBook(id: any): Promise<any> {
    const res = await api.get(`/books/${id}`);
    return res.data;
  }

  async createBook(data: any): Promise<any> {
    const res = await api.post("/books", data);
    return res.data;
  }

  async updateBook({ id, data }: any): Promise<any> {
    const res = await api.put(`/books/${id}`, data);
    return res.data;
  }

  async deleteBook(id: any): Promise<any> {
    const res = await api.delete(`/books/${id}`);
    return res.data;
  }
}

export const bookService = new BookService();
