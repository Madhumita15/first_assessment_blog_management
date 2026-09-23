
import { useAppSeletor } from "../services/helper/redux";
import { Navigate, Outlet } from "react-router-dom";

const UserProtectedRoute = () => {
  const { accessToken, role } = useAppSeletor(
    (state) => state.user,
  );

  if (!accessToken) {
    return <Navigate to={"/login"} />;
  }

  if (accessToken && role === "admin") {
    return <Navigate to={"/user/adminBlogManagement"} />;
  }

  return <Outlet />;
};
export default UserProtectedRoute;
