import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login";
import Home from "../pages/Home";
import Register from "../pages/auth/Register";
import UserWrapper from "../layout/userPanel/UserWrapper";
import AdminWrapper from "../layout/adminPanel/AdminWrapper";
import AdminBlogManagement from "../pages/admin/AdminBlogManagement";
import UserBlogManagement from "../pages/user/UserBlogManagement";
import AdminUserManagement from "../pages/admin/AdminUserManagement";

const Routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
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
  },

  {
    path: "/user/",
    element: <AdminWrapper />,
    children: [
      {
        path: "userBlogmanagement",
        element: <UserBlogManagement />,
      },
    ],
  },
]);

export default Routes;
