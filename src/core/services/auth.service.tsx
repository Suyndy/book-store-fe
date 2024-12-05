import api from "../config/api";

class AuthenticationService {
  async signupEmail(data: any) {
    const res = await api.post("/register", data);
    return res.data;
  }

  async verifyEmail(data: any) {
    const res = await api.post("/verify", data);
    return res.data;
  }

  async verifyPassword(data: any) {
    const res = await api.post("/verify-forgot-password", data);
    return res.data;
  }

  async setPassword(data: any) {
    const res = await api.post(`/set-password`, data);
    return res.data;
  }

  async resetPassword(data: any) {
    const res = await api.post(`/reset-password`, data);
    return res.data;
  }

  async getProfile() {
    const res = await api.get(`/me`);
    return res.data;
  }

  async loginEmail(data: any) {
    const res = await api.post("/login", data);
    return res.data;
  }

  async forgotPassword(data: any) {
    const res = await api.post("/forgot-password", data);
    return res.data;
  }
}

// Correct export syntax
export const authenticationService = new AuthenticationService();
