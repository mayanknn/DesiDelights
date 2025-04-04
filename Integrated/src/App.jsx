import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation, Outlet } from "react-router-dom";
import Navbar from "./pages/Landing/Components/Navbar";
import Home from "./pages/Landing/Home";
import About from "./pages/Landing/About";
import Menu from "./pages/Landing/Menu";
import Contact from "./pages/Landing/Contact";
import Reservation from "./pages/Landing/Reservation";
import Login from "./pages/Landing/Login";
import Layout from "./pages/Manager/MComponents/Layout";
import Dashboard from "./pages/Manager/MPages/Dashboard";
import MenuManager from "./pages/Manager/MPages/MenuManager";
import Categories from "./pages/Manager/MPages/Categories";
import ManageItems from "./pages/Manager/MPages/ManageItems";
import Donations from "./pages/Manager/MPages/Donations";
import Statistics from "./pages/Manager/MPages/Statistics";
import AddTable from "./pages/Manager/MPages/AddTable";
import Profile from "./pages/Manager/MPages/Profile";
import Sidebar from "./pages/Admin/AComponents/Sidebar";
import Dashboard1 from "./pages/Admin/Apages/Dashboard";
import Orders from "./pages/Admin/Apages/Orders";
import Menu1 from "./pages/Admin/Apages/Menu";
import Tables from "./pages/Admin/Apages/Tables";
import Customers from "./pages/Admin/Apages/Customers";
import Donations1 from "./pages/Admin/Apages/Donations";
import Reports from "./pages/Admin/Apages/Reports";
import Settings from "./pages/Admin/Apages/Settings";
import ChefPage from "./pages/Chef/Ccomponents/ChefPage";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "./NotFound";

function AdminLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-4">
        <Outlet />
      </div>
    </div>
  );
}

function App() {
  const location = useLocation();
  const isManagerRoute = location.pathname.startsWith("/manager");
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isChefRoute = location.pathname.startsWith("/chef");
  const isPageRoute = location.pathname.startsWith("/404");

  return (
    <div className="min-h-screen bg-gray-50">
      {!isManagerRoute && !isAdminRoute && !isChefRoute && !isPageRoute && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/login" element={<Login />} />

        {/* Manager Routes */}
        <Route
          path="/manager"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="menu" element={<MenuManager />} />
          <Route path="categories" element={<Categories />} />
          <Route path="items" element={<ManageItems />} />
          <Route path="add-table" element={<AddTable />} />
          <Route path="donations" element={<Donations />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard1 />} />
          <Route path="orders" element={<Orders />} />
          <Route path="menu" element={<Menu1 />} />
          <Route path="tables" element={<Tables />} />
          <Route path="customers" element={<Customers />} />
          <Route path="donations" element={<Donations1 />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Chef Route */}
        <Route
          path="/chef"
          element={
            <ProtectedRoute allowedRoles={["Chef"]}>
              <ChefPage />
            </ProtectedRoute>
          }
        />

        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
