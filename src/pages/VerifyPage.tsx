import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, message, Spin } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authenticationService } from "../core/services/auth.service";
import api from "../core/config/api";
import { useStoreContext } from "../context/MyContext";

const VerifyPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [verify, setVerify] = useState(false);
  const [first, setFirst] = useState(0);
  const { setUser } = useStoreContext();

  // Lấy token và email
  const token = searchParams.get("token");
  const email = searchParams.get("email")?.replace(/ /g, "+");

  const { mutate, isPending } = useMutation({
    mutationFn: authenticationService.verifyEmail,
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

  const getProfile = async () => {
    const res = await api.get("/me");
    return res.data;
  };

  const { mutate: setPassword, isPending: pendingPassword } = useMutation({
    mutationFn: authenticationService.setPassword,
    onSuccess: async (res) => {
      await localStorage.setItem("token", res.token);
      const userInfor = await getProfile();
      console.log(userInfor);
      setUser(userInfor);
      //   if(userInfor?.)
      navigate("/");
      message.success("Đặt mật khẩu thành công.");
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
              Đặt mật khẩu
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
                  Cập nhật
                </Button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyPage;
