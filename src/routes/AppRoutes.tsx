// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import AdminLayout from "../components/layouts/AdminLayout";
import ManageLaptop from "../pages/admin/ManageLaptop/ManageLaptop";
import LoginForm from "../pages/admin/Login/Login";
import RoleBaseLayout from "../components/layouts/RoleBaseLayout";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
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
