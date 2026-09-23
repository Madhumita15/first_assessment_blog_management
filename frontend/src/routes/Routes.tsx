import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login";
import Home from "../pages/Home";
import Register from "../pages/auth/Register";
import UserWrapper from "../layout/userPanel/UserWrapper";
import AdminWrapper from "../layout/adminPanel/AdminWrapper";
import AdminBlogManagement from "../pages/admin/AdminBlogManagement";
import UserBlogManagement from "../pages/user/UserBlogManagement";
import AdminUserManagement from "../pages/admin/AdminUserManagement";
import PublicProtectedRoute from "../components/PublicProtectedRoute";
import UserProtectedRoute from "../components/UserProtectedRoute";
import AdminProtectedRoute from "../components/AdminProtectedRoute";

const Routes = createBrowserRouter([
  {
    path: "/login",
    element: <PublicProtectedRoute />,
    children: [
      {
        path: "",
        element: <Login />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/",
    element: <UserWrapper />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },

  {
    path: "/admin/",
    // element: <AdminProtectedRoute />,
    // children: [
    //   {
        element: <AdminWrapper />,
        children: [
          {
            path: "adminBlogmanagement",
            element: <AdminBlogManagement />,
          },
          {
            path: "userManagement",
            element: <AdminUserManagement />,
          },
        ],
    //   },
    // ],
  },

  {
    path: "/user/",
    element: <UserProtectedRoute />,
    children: [
      {
        element: <AdminWrapper />,

        children: [
          {
            path: "userBlogmanagement",
            element: <UserBlogManagement />,
          },
        ],
      },
    ],
  },
]);

export default Routes;
