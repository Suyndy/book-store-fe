import { message, Spin } from "antd";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../core/config/api";
import { authenticationService } from "../core/services/auth.service";
import { useStoreContext } from "../context/MyContext";

const LoginGoogle = () => {
  const location = useLocation();
  const { setUser } = useStoreContext();
  const navigate = useNavigate();

  useEffect(() => {
    const login = async () => {
      try {
        const res = await api.get(`/auth/google/callback${location?.search}`);
        await localStorage.setItem("token", res?.data?.token);
        const res2 = await authenticationService.getProfile();
        await setUser(res2);
        message.success("Đăng nhập thành công.");
        navigate("/");
      } catch (error) {
        message.error("Đăng nhập thất bại.");
        navigate("/signin");
      }
    };

    login();
  }, []);

  return (
    <div className="h-40 flex justify-center items-center">
      <Spin />
    </div>
  );
};

export default LoginGoogle;
