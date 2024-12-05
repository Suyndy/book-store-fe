import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, message, Spin } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authenticationService } from "../core/services/auth.service";

const VerifyPasswordPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [verify, setVerify] = useState(false);
  const [first, setFirst] = useState(0);

  // Lấy token và email
  const token = searchParams.get("token");
  const email = searchParams.get("email")?.replace(/ /g, "+");

  const { mutate, isPending } = useMutation({
    mutationFn: authenticationService.verifyPassword,
    onSuccess: () => {
      //   navigate(`/changepassword?token=${token}&email=${email}`);
      setVerify(true);
      setFirst(1);
    },
    onError: () => {
      setFirst(1);
    },
  });

  useEffect(() => {
    if (email && token && first == 0) {
      mutate({ token, email });
    }
  }, [email, token]);

  const { mutate: setPassword, isPending: pendingPassword } = useMutation({
    mutationFn: authenticationService.resetPassword,
    onSuccess: async () => {
      navigate("/signin");
      message.success("Đặt lại mật khẩu thành công.");
    },
    onError: () => {
      message.error("Đã có lỗi xảy ra");
    },
  });

  const handleChangePassword = (values: any) => {
    setPassword({ email, token, password: values?.password });
  };

  return (
    <div className="min-h-svh flex justify-center items-center">
      {!verify ? (
        isPending ? (
          <>
            <Spin size="large" />
          </>
        ) : (
          <div className="flex flex-col gap-5">
            <div className="text-3xl">Xác minh thất bại!</div>
            <Button
              className="bg-red-500 text-white"
              onClick={() => navigate("/")}
              size="large"
            >
              Quay về trang chủ
            </Button>
          </div>
        )
      ) : (
        <div className="contain py-16">
          <div className="max-w-lg mx-auto border border-gray-300 px-6 py-7 rounded overflow-hidden">
            <h2 className="text-2xl uppercase font-medium mb-1">
              Đặt lại mật khẩu
            </h2>
            <p className="text-gray-600 mb-6 text-sm">
              Mật khẩu của bạn nên có ít nhất 8 ký tự và nên bao gồm chữ cái và
              số.
            </p>
            <Form onFinish={handleChangePassword}>
              <div className="space-y-2">
                <div>
                  <label
                    htmlFor="password"
                    className="text-gray-600 mb-2 block"
                  >
                    Mật khẩu mới
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
                <div>
                  <label
                    htmlFor="password"
                    className="text-gray-600 mb-2 block"
                  >
                    Xác nhận lại mật khẩu
                  </label>
                  <Form.Item
                    name="repassword"
                    rules={[
                      {
                        required: true,
                        message: "Nhập lại mật khẩu không được bỏ trống.",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "Nhập lại mật khẩu không khớp với mật khẩu."
                            )
                          );
                        },
                      }),
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

              <div className="mt-4">
                <Button
                  htmlType="submit"
                  className="h-10 bg-red-500 text-white w-full"
                  loading={pendingPassword}
                >
                  Đặt lại mật khẩu
                </Button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyPasswordPage;
