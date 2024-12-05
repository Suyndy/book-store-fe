import api from "../config/api";

class UserService {
  async getAllUser() {
    const res = await api.get("/users");
    return res.data;
  }

  async loginUser(data: any) {
    const res = await api.post("/users/login", data);
    return res.data;
  }

  async getUserInfor() {
    const res = await api.get("/users/user-info");
    return res.data;
  }
}

// Correct export syntax
export const userService = new UserService();
