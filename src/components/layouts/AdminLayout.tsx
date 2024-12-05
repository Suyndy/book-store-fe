import { Outlet, useNavigate } from "react-router-dom";
import { ConfigProvider, Menu } from "antd";
import styles from "./AdminLayout.module.scss";
import { MdLaptopChromebook, MdSupervisorAccount } from "react-icons/md";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import AdminHeader from "../features/AdminHeader/AdminHeader";
import { colorBrand } from "../../utils/constant";
import { BiCategory } from "react-icons/bi";

const AdminLayout = () => {
  const navigate = useNavigate();

  const items: any = [
    {
      key: "invoice",
      icon: <LiaFileInvoiceDollarSolid />,
      label: "Quản lý hóa đơn",
      // onClick: () => alert("abc"),
    },
    {
      key: "laptop",
      icon: <MdLaptopChromebook />,
      label: "Quản lý sách",
      onClick: () => navigate("/admin/book"),
    },
    {
      key: "category",
      icon: <BiCategory />,
      label: "Quản lý danh mục",
      onClick: () => navigate("/admin/category"),
    },
    {
      key: "account",
      icon: <MdSupervisorAccount />,
      label: "Quản lý tài khoản",
    },
  ];
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: colorBrand, // Màu primary của ứng dụng
        },
      }}
    >
      <div className={styles.layout}>
        <div className={styles.sider_bar}>
          <div className={styles.brand}>VITAMIN A</div>
          <div>
            <ConfigProvider
              theme={{
                components: {
                  Menu: {
                    itemSelectedBg: "var(--color-brand)",
                    colorPrimary: "white",
                    colorBgContainer: "white",
                  },
                },
              }}
            >
              <Menu
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                mode={"vertical"}
                items={items}
              />
            </ConfigProvider>
          </div>
        </div>
        <div className={styles.content_right}>
          <AdminHeader />
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default AdminLayout;
