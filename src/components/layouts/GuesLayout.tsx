import { Outlet, useNavigate } from "react-router-dom";
import { useStoreContext } from "../../context/MyContext";
import { useEffect } from "react";

const GuesLayout = () => {
  const { user } = useStoreContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return <Outlet />;
};

export default GuesLayout;
