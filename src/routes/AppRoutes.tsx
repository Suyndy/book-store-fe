// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import AdminLayout from "../components/layouts/AdminLayout";
import ManageBook from "../pages/admin/ManageBook/ManageBook";
import LoginForm from "../pages/admin/Login/Login";
import RoleBaseLayout from "../components/layouts/RoleBaseLayout";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Shop from "../pages/user/Shop/Shop";
import ProductDetail from "../pages/user/ProductDetail/ProductDetail";
import Cart from "../pages/user/Cart/Cart";
import ForgotPassword from "../pages/ForgotPassword";
import ChangePassword from "../pages/ChangePassword";
import ManageCategory from "../pages/admin/ManageCategory/ManageCategory";
import VerifyPage from "../pages/VerifyPage";
import VerifyPasswordPage from "../pages/VerifyPasswordPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/auth/verify-email" element={<VerifyPage />} />
          <Route
            path="/auth/verify-password"
            element={<VerifyPasswordPage />}
          />
        </Route>
        <Route element={<RoleBaseLayout roles={["admin"]} />}>
          {/* <Route element={<AdminLayout />}>
            <Route path="/admin" element={<Home />} />
            <Route path="/admin/laptop" element={<ManageLaptop />} />
          </Route> */}
        </Route>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Home />} />
          <Route path="/admin/book" element={<ManageBook />} />
          <Route path="/admin/category" element={<ManageCategory />} />
        </Route>
        <Route path="/admin/login" element={<LoginForm />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
