
import { useAppSeletor } from "../services/helper/redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const { accessToken, role } = useAppSeletor(
    (state) => state.user,
  );

  if (!accessToken) {
    return <Navigate to={"/login"} />;
  }

  if (accessToken && role === "user") {
    return <Navigate to={"/user/userBlogManagement"} />;
  }

  return <Outlet />;
};
export default AdminProtectedRoute;
