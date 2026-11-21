
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Home from "../components/pages/Home.jsx";
import Report from "../components/pages/Report.jsx";
import Dashboard from "../components/pages/Dashboard.jsx";
import Opportunities from "../components/pages/Opportunities.jsx";
import Support from "../components/pages/Support.jsx";
import Login from "../components/pages/Login.jsx";
import Register from "../components/pages/Register.jsx";
import RoleSelection from "../components/pages/RoleSelection.jsx";
import OrganizationRegister from "../components/pages/OrganizationRegister.jsx";
// Layout
import MainLayout from "../components/layout/MainLayout";

// Route protection
import ProtectedRoute from "./ProtectedRoute";

// Authentication hook
import useAuth from "../hooks/useAuth";

// Redirect authenticated users away from login/register.
function GuestRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* =================================
          PUBLIC PAGES
      ================================== */}
      <Route element={<MainLayout />}>
        {/* Homepage */}
        <Route path="/" element={<Home />} />

        {/* Join Her Gasha - Select Account Type */}
        <Route path="/join" element={<RoleSelection />} />

        {/* Opportunities */}
        <Route
          path="/opportunities"
          element={<Opportunities />}
        />
      </Route>

      {/* =================================
          GUEST-ONLY PAGES
      ================================== */}
      <Route
  path="/organization-register"
  element={
    <GuestRoute>
      <OrganizationRegister />
    </GuestRoute>
  }
/>
      {/* Login */}
      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />

      {/* Student Registration */}
      <Route
        path="/register"
        element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        }
      />

      {/* =================================
          AUTHENTICATED PAGES
      ================================== */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* Submit and view reports */}
          <Route
            path="/report"
            element={<Report />}
          />

          {/* Support */}
          <Route
            path="/support"
            element={<Support />}
          />
        </Route>
      </Route>

      {/* =================================
          UNKNOWN ROUTES
      ================================== */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}
