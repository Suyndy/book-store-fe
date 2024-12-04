import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { authenticationService } from "../core/services/auth.service";

interface MyContextType {
  user?: any;
  setUser?: any;
  initApp?: boolean;
  setInitApp?: any;
  options?: any;
  setOptions?: any;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  //   const [data, setData] = useState<string>("");
  const [user, setUser] = useState<any>(null);
  const [initApp, setInitApp] = useState(false);
  const [options, setOptions] = useState(null);

  useEffect(() => {
    (async () => {
      const token = await localStorage.getItem("token");

      if (!token) {
        setInitApp(true); // Hoàn tất khởi tạo ngay cả khi không có token
        return setUser(null);
      }
      try {
        const res = await authenticationService.getProfile();
        setUser(res);
      } catch (error) {
        setUser(null);
      } finally {
        setInitApp(true); // Đặt initApp=true sau khi quá trình kiểm tra hoàn tất
      }
    })();
  }, []);

  return (
    <MyContext.Provider
      value={{ user, setUser, initApp, setInitApp, options, setOptions }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useStoreContext = (): MyContextType => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};
