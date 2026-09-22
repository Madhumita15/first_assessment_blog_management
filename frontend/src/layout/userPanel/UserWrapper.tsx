import Navbar from "./Navbar"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"


const UserWrapper = () => {
  return (
    <>
    <Navbar />
    <Outlet />
    <Footer />
    </>
  )
}

export default UserWrapper