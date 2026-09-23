import { useAppSeletor } from "../services/helper/redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicProtectedRoute = () => {
  const { accessToken, role } = useAppSeletor(
    (state) => state.user,
  );



  if (accessToken) {
    return role === "admin" ? (
      <Navigate to="/admin/adminBlogmanagement" replace />
    )  : (
      <Navigate to="/user/userBlogmanagement" replace />
    );
  }

  return <Outlet />;
};

export default PublicProtectedRoute;
