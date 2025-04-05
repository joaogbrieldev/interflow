import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./view/pages/login/Login";
import Register from "./view/pages/register/Register";
import Dashboard from "./view/pages/dashboard/Dashboard";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};
