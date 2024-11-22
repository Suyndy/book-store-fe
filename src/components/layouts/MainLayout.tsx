import { Outlet } from "react-router-dom";
import Header from "../features/Header/Header";
import { ConfigProvider } from "antd";
// import Header from "../components/Header";

const MainLayout = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#e80104", // Màu primary của ứng dụng
        },
      }}
    >
      <div>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </ConfigProvider>
  );
};

export default MainLayout;
