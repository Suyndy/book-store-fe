// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import AdminLayout from "../components/layouts/AdminLayout";
import ManageLaptop from "../pages/admin/ManageLaptop/ManageLaptop";
import LoginForm from "../pages/admin/Login/Login";
import RoleBaseLayout from "../components/layouts/RoleBaseLayout";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Shop from "../pages/user/Shop/Shop";
import ProductDetail from "../pages/user/ProductDetail/ProductDetail";
import Cart from "../pages/user/Cart/Cart";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route element={<RoleBaseLayout roles={["admin"]} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<Home />} />
            <Route path="/admin/laptop" element={<ManageLaptop />} />
          </Route>
        </Route>
        <Route path="/admin/login" element={<LoginForm />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
