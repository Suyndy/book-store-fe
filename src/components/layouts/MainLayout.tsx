import { Outlet } from "react-router-dom";
import { ConfigProvider } from "antd";
import { colorBrand } from "../../utils/constant";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
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
        <Footer />
      </div>
    </ConfigProvider>
  );
};

export default MainLayout;
