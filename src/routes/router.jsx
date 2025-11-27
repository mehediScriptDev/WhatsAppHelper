import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../layouts/mainLayout/homeLayout/Mainlayout";
import Home from "../pages/home/Home";
import Login from "../pages/authentication/login/Login";
import PrivateRoute from "./privateRoutes/PrivateRoute";
import Role from "../auth/role";
console.log(Role);

import UserDashBoard from "../layouts/dashboardLayout/user/pages/UserDashBoard";
import DashBoardLayOut from "../layouts/dashboardLayout/DashBoardLayOut";
import ReferralProgram from "../layouts/dashboardLayout/user/pages/ReferralProgram";
import Profile from "../layouts/dashboardLayout/user/pages/Profile";
import Connectivity from "../layouts/dashboardLayout/user/pages/Connectivity";
import WithdrawPage from "../layouts/dashboardLayout/user/pages/WithdrawPage";
import Register from "../pages/authentication/register/Register";
import WhatsappBot from "../layouts/dashboardLayout/user/pages/WhatsappBot";
import CookiePolicy from "../pages/legal/CookiePolicy";
import Terms from "../pages/legal/Terms";
import PrivacyPolicy from "../pages/legal/PrivacyPolicy";
import NotificationPage from "../layouts/dashboardLayout/user/pages/NotificationPage";
import ForgotPassword from "../pages/authentication/login/ForgotPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "privacy",
        element: <PrivacyPolicy />,
      },
      {
        path: "cookies",
        element: <CookiePolicy />,
      },
      {
        path: "terms",
        element: <Terms />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute allowedRoles={[Role.USER]}>
        <DashBoardLayOut />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <UserDashBoard />,
      },
      {
        path: "userdashboard",
        element: <UserDashBoard />,
      },
      {
        path: "referral",
        element: <ReferralProgram />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "connectivity",
        element: <Connectivity />,
      },
      {
        path: "withdraw",
        element: <WithdrawPage />,
      },
      {
        path: "whatsappbots",
        element: <WhatsappBot />,
      },
      {
        path: "notifications",
        element: <NotificationPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      // Admin page should require the ADMIN role
      <PrivateRoute allowedRoles={[Role.ADMIN]}>
        <DashBoardLayOut />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <div>Admin Dashboard</div>,
      },
      {
        path: "users",
        element: <div>Manage Users</div>,
      },
      {
        path: "campaigns",
        element: <div>Manage Campaigns</div>,
      },
      {
        path: "whatsappintegration",
        element: <div>Manage WhatsApp Integration</div>,
      },
      {
        path: "performancemetrics",
        element: <div>Manage Performance Metrics</div>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/unauthorized",
    element: <div>unauthorized</div>,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
