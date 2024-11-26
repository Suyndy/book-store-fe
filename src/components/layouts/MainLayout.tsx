import { Outlet } from "react-router-dom";
import Header from "../features/Header/Header";
import { ConfigProvider } from "antd";
import { colorBrand } from "../../utils/constant";
// import Header from "../components/Header";

const MainLayout = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: colorBrand, // Màu primary của ứng dụng
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
