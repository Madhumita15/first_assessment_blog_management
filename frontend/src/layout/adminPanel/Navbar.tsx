import { useAppSeletor } from "../../services/helper/redux"

const Navbar = () => {
   const {accessToken, user} = useAppSeletor((state)=> state.user)
  return (
    <>
    {accessToken && user && (
        <h1 className="font-bold text-xl font-mono ">
          Welcome {user?.name} to your dashboard
        </h1>
      )}
    </>
    
  )
}

export default Navbar