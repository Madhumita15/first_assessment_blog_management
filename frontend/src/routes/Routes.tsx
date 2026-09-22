import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login";
import Home from "../pages/Home";
import Register from "../pages/auth/Register";


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
    element: <Home />,
  },

 

  

 
]);

export default Routes;
