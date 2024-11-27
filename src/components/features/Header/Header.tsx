import { Button } from "antd";
import styles from "./Header.module.scss";

const Header = () => {
  //   const { user, setUser } = useStoreContext();

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.logo}>My Logo</div>
        <div className={styles.right}>
          <Button>Đăng ký</Button>
          <Button type="primary">Đăng nhập</Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
