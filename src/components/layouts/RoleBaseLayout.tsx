import { Outlet, useNavigate } from "react-router-dom";
import { useStoreContext } from "../../context/MyContext";
import { useEffect, useState } from "react";

const RoleBaseLayout = ({ roles }: any) => {
  const { user, initApp } = useStoreContext();
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (!initApp) return;

    if (!user || (user && !roles.includes(user.role))) {
      navigate("/");
      setIsAuthorized(false);
    } else {
      setIsAuthorized(true);
    }
  }, [user, initApp, roles, navigate]);

  if (!initApp) {
    return <div>Loading...</div>;
  }

  if (isAuthorized === false) {
    return null;
  }

  return <Outlet />;
};

export default RoleBaseLayout;
