import { useMutation } from "@tanstack/react-query";
import { Alert, Button, Form, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { authenticationService } from "../core/services/auth.service";
import { useState } from "react";

const Signup = () => {
  const [form] = useForm();
  const [alert, setAlert] = useState<any>(null);
  const { mutate, isPending } = useMutation({
    mutationFn: authenticationService.signupEmail,
    onSuccess: () => {
      setAlert("Đã gửi liên kết xác thực đăng ký đến email của bạn.");
      form.resetFields();
    },
    onError: () => {
      message.error("Email đã tồn tại");
      setAlert(null);
    },
  });

  const handleSubmit = (values: any) => {
    mutate(values);
  };

  return (
    <div className="contain py-16">
      <div className="max-w-lg mx-auto border border-gray-300 px-6 py-7 rounded overflow-hidden">
        <h2 className="text-2xl uppercase font-medium mb-1">Tạo tài khoản</h2>
        <p className="text-gray-600 mb-6 text-sm">Đăng ký tài khoản</p>
        <Form form={form} onFinish={handleSubmit}>
          <div className="space-y-2">
            <div>
              <label htmlFor="name" className="text-gray-600 mb-2 block">
                Họ tên
              </label>
              <Form.Item
                name="name"
                rules={[
                  { required: true, message: "Tên không được bỏ trống." },
                ]}
              >
                <Input placeholder="Nhập họ tên" />
              </Form.Item>
            </div>
            <div>
              <label htmlFor="email" className="text-gray-600 mb-2 block">
                Email
              </label>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Email không được bỏ trống." },
                  { type: "email", message: "Vui lòng nhập một email hợp lệ." },
                ]}
              >
                <Input placeholder="youremail.@domain.com" />
              </Form.Item>
            </div>
          </div>

          {alert && <Alert type="success" message={alert} showIcon />}

          <div className="mt-4">
            <Button
              htmlType="submit"
              className="block h-10 w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
              loading={isPending}
            >
              Tạo tài khoản
            </Button>
          </div>
        </Form>

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
            facebook
          </a>
          <a
            // href="http://localhost:8000/auth/google"
            href={`${import.meta.env.VITE_API_URL || 'https://book.suyndy.id.vn/api'}/auth/google`}
            className="w-1/2 py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500"
          >
            google
          </a>
        </div>

        <p className="mt-4 text-center text-gray-600">
          Bạn đã có tài khoản?{" "}
          <a href="/signin" className="text-primary">
            Đăng nhập ngay
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
