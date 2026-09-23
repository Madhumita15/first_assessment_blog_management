import { NavLink, useNavigate } from "react-router-dom";
import { Rss, User } from "lucide-react";
import { Button } from "@mui/material";
import { toast } from "sonner";
import { useAppDispatch, useAppSeletor } from "../../services/helper/redux";
import { logout } from "../../store/slices/user.slice";


const Sidebar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { accessToken, role, user } = useAppSeletor((state) => state.user);

  

  const adminMenu = [
    {
      path: "/admin/adminBlogManagement",
      icon: Rss,
      name: "Blog Management",
    },
    {
      path: "/admin/userManagement",
      icon: User,
      name: "User Management",
    },
  ];

  const userMenu = [
    {
      path: "/user/userBlogManagement",
      icon: Rss,
      name: "BlogManagement",
    },
  ];

  const handleLogout = async () => {
    try {
      const response = await dispatch(logout()).unwrap();
      console.log(response);
      if (response.success === true) {
        toast.success(response.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error as string)
    }
  };

  const menuItems =
  role === "admin"
    ? adminMenu
    : role === "user"
    ? userMenu
    : [];

  return (
    <>
      <div className="relative">
        <div className="mt-28 flex flex-col">
          
              {accessToken && menuItems?.map((item) => (
                <NavLink
                  key={item.name}
                  className={({ isActive }) =>
                    isActive
                      ? "shadow-xl bg-slate-700 p-5 text-lg border-l-2 border-l-[#a172cb] border-r-2 border-r-[#a172cb] m-2  font-bold rounded-md flex flex-row gap-2 "
                      : "shadow-lg p-5 border-r-2 border-l-[#a172cb] border-l-2 border-r-[#a172cb] m-2 text-lg  font-bold rounded-md flex flex-row gap-2 "
                  }
                  to={item.path}
                >
                  {<item.icon />} {item.name}
                </NavLink>
              ))}
            
         
             
          
         
        </div>

        <div className="absolute flex gap-3 flex-row items-center bg-slate-900 p-3 top-[470px] rounded-md border border-[#7e22ce]  w-[270px] ml-4">
          <div >
            {(accessToken && user) ? <img src={user.profile_image} className="h-10 w-10 rounded-full" alt="img"/> : <User className="h-10 w-10 rounded-full" />}
          </div>
          <div className="flex flex-col ">
            <h2 className="text-sm"> {user?.name}</h2>
            <h2 className="text-sm text-gray-500"> {user?.email}</h2>
          </div>
        </div>
        <Button
          variant="contained"
          className={`w-[270px] absolute ${role === "admin" ? "top-96" : "top-[450px]" }  left-4`}
          style={{
            padding: "10px",
            backgroundColor: "#7e22ce",
            borderRadius: "20%",
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </>
  );
};

export default Sidebar;
