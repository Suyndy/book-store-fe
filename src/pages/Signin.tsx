import { useMutation } from "@tanstack/react-query";
import { authenticationService } from "../core/services/auth.service";
import api from "../core/config/api";
import { useStoreContext } from "../context/MyContext";
import { Alert, Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Signin = () => {
  const navigate = useNavigate();
  const { setUser } = useStoreContext();
  const [err, setErr] = useState<any>(null);

  const getProfile = async () => {
    const res = await api.get("/me");
    return res.data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: authenticationService.loginEmail,
    onSuccess: async (res) => {
      await localStorage.setItem("token", res.token);
      const userInfor = await getProfile();
      setUser(userInfor);
      navigate(userInfor?.is_staff ? "/admin" : "/");
      message.success("Đặt mật thành công.");
    },
    onError: (err: any) => {
      setErr(
        err?.status == 401 ? "Sai email hoặc mật khẩu." : "Đã có lỗi xảy ra."
      );
    },
  });

  const handleLogin = (values: any) => {
    mutate({ email: values?.email, password: values?.password });
  };

  return (
    <div className="contain py-16">
      <div className="max-w-lg mx-auto border border-gray-300 px-6 py-7 rounded overflow-hidden">
        <h2 className="text-2xl uppercase font-medium mb-1">Đăng nhập</h2>
        <p className="text-gray-600 mb-6 text-sm">Chào mừng bạn!</p>
        <Form onFinish={handleLogin}>
          <div className="space-y-2">
            <div>
              <label htmlFor="email" className="text-gray-600 mb-2 block">
                Email
              </label>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: " Email không được bỏ trống.",
                  },
                ]}
              >
                <Input minLength={8} size="large" placeholder="Email" />
              </Form.Item>
            </div>
            <div>
              <label htmlFor="password" className="text-gray-600 mb-2 block">
                Mật khẩu
              </label>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: " Mật khẩu không được bỏ trống.",
                  },
                ]}
              >
                <Input.Password
                  minLength={8}
                  size="large"
                  placeholder="*******"
                />
              </Form.Item>
            </div>
          </div>
          <div className="flex items-center justify-end mt-6 mb-6">
            <a href="/forgotpassword" className="text-primary">
              Quên mật khẩu?
            </a>
          </div>
          {err && <Alert type="error" message={err} showIcon />}

          <div className="mt-4">
            <Button
              htmlType="submit"
              className="h-10 text-white bg-red-500 w-full"
              loading={isPending}
            >
              Đăng nhập
            </Button>
          </div>
        </Form>

        {/* Login with */}
        <div className="mt-6 flex justify-center relative">
          <div className="text-gray-600 uppercase px-3 bg-white z-10 relative">
            Hoặc
          </div>
          <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
        </div>
        <div className="mt-4 flex gap-4">
          <a
            href="#"
            className="w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm hover:bg-blue-700"
          >
            Facebook
          </a>
          <a
            // href="http://localhost:8000/auth/google"
            href={`${import.meta.env.VITE_API_URL || 'https://book.suyndy.id.vn/api'}/auth/google`}
            className="w-1/2 py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500"
          >
            Google
          </a>
        </div>

        <p className="mt-4 text-center text-gray-600">
          Không có tài khoản?{" "}
          <a href="/signup" className="text-primary">
            Đăng ký ngay
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signin;
