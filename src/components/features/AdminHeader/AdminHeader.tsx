import { Breadcrumb, Dropdown } from "antd";
import { FaUserCircle } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { useStoreContext } from "../../../context/MyContext";
import styles from "./AdminHeader.module.scss";

const AdminHeader = () => {
  const { user, setUser } = useStoreContext();
  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const items: any = [
    {
      key: "1",
      label: "Đăng xuất",
      onClick: handleSignOut,
    },
  ];

  return (
    <div className={styles.header}>
      <Breadcrumb
        items={[
          {
            title: (
              <p>
                <IoHomeOutline size={20} />
              </p>
            ),
          },
          // {
          //   title: <p>abc</p>,
          // },
        ]}
      />
      <div className={styles.header_middle}>QUẢN LÝ SÁCH</div>
      <div className={styles.header_right}>
        <p>{user?.name}</p>
        <Dropdown menu={{ items }}>
          <FaUserCircle size={24} />
        </Dropdown>
      </div>
    </div>
  );
};

export default AdminHeader;
