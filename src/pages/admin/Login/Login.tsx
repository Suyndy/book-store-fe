import {
  Form,
  Input,
  Button,
  Checkbox,
  ConfigProvider,
  Alert,
  message,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styles from "./Login.module.scss";
import { useMutation } from "@tanstack/react-query";
import { userService } from "../../../core/services/user.service";
import { useState } from "react";
import { useStoreContext } from "../../../context/MyContext";
import { useNavigate } from "react-router-dom";
import { colorBrand } from "../../../utils/constant";

const LoginForm = () => {
  const [error, setError] = useState<any>();
  const { setUser, setInitApp } = useStoreContext();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: userService.loginUser,
    onSuccess: (res) => {
      setUser(res.user);
      message.success(res.message);
      navigate("/admin");
      localStorage.setItem("TOKEN", res.token);
      setInitApp(true);
    },
    onError: (err: any) => {
      const error = err.response.data.error;
      setError(error);
    },
  });

  const onFinish = (values: any) => {
    mutate({ ...values, isAdmin: true });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: colorBrand, // Màu primary của ứng dụng
        },
      }}
    >
      <div className={styles.layout}>
        <div className={styles.container}>
          <p> ADMIN LoWindyAn</p>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "The input is not a valid email!" },
              ]}
            >
              <Input
                size="large"
                prefix={<UserOutlined />}
                placeholder="Enter your email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter your password"
                size="large"
              />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            {error && (
              <Form.Item>
                <Alert
                  closeIcon
                  onClose={() => setError(null)}
                  message={error}
                  type="error"
                  showIcon
                />
              </Form.Item>
            )}

            <Form.Item>
              <Button
                loading={isPending}
                type="primary"
                htmlType="submit"
                block
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default LoginForm;
