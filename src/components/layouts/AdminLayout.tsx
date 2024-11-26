import { Outlet, useNavigate } from "react-router-dom";
import { Breadcrumb, ConfigProvider, Menu } from "antd";
import styles from "./AdminLayout.module.scss";
import { MdLaptopChromebook, MdSupervisorAccount } from "react-icons/md";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { FaUserCircle } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { useStoreContext } from "../../context/MyContext";
import AdminHeader from "../features/AdminHeader/AdminHeader";
import { colorBrand } from "../../utils/constant";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { user } = useStoreContext();

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
      label: "Quản lý laptop",
      onClick: () => navigate("/admin/laptop"),
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
          <div className={styles.brand}>LoWindyAn</div>
          <div>
            <ConfigProvider
              theme={{
                components: {
                  Menu: {
                    colorItemBgSelected: "var(--color-brand)",
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
