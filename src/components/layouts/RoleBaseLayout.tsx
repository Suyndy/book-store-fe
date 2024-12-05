import { Outlet, useNavigate } from "react-router-dom";
import { useStoreContext } from "../../context/MyContext";
import { useEffect, useState } from "react";

const RoleBaseLayout = ({ isAdmin = false }: any) => {
  const { user, initApp } = useStoreContext();
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (!initApp) return;

    if (!user) {
      navigate("/");
      setIsAuthorized(false);
    } else {
      setIsAuthorized(true);
      if (isAdmin && !user?.is_staff) {
        navigate("/");
      }
    }
  }, [user, initApp, isAdmin, navigate]);

  if (!initApp) {
    return <div>Loading...</div>;
  }

  if (isAuthorized === false) {
    return null;
  }

  return <Outlet />;
};

export default RoleBaseLayout;
