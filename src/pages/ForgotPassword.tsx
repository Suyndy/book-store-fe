import { useMutation } from "@tanstack/react-query";
import { Alert, Button, Form, Input, message } from "antd";
import { authenticationService } from "../core/services/auth.service";
import { useState } from "react";

const ForgotPassword = () => {
  const [alert, setAlert] = useState<any>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: authenticationService.forgotPassword,
    onSuccess: async () => {
      setAlert("Đã gửi liên kết đặt lại mật khẩu tới email của bạn.");
    },
    onError: () => {
      message.error("Đã có lỗi xảy ra.");
    },
  });

  const handleLogin = (values: any) => {
    mutate({ email: values?.email });
  };

  return (
    <div className="contain py-16">
      <div className="max-w-lg mx-auto border border-gray-300 px-6 py-7 rounded overflow-hidden">
        <h2 className="text-2xl uppercase font-medium mb-1">
          CẤP LẠI MẬT KHẨU
        </h2>
        <p className="text-gray-600 mb-6 text-sm">
          Nhập địa chỉ email liên kết với tài khoản Bookstore của bạn.
        </p>
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
          </div>
          {alert && <Alert showIcon type="success" message={alert} />}

          <div className="mt-4">
            <Button
              htmlType="submit"
              className="h-10 text-white bg-red-500 w-full"
              loading={isPending}
            >
              Gửi email
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
