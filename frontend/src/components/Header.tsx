import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContexts";
import Logout from "./Logout";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

function Header() {
  const { isLoggedin } = useAppContext();
  const [menu ,setMenu] = useState(false)
  return (
    <div className=" bg-blue-900 py-6">
      <div className="flex justify-between mx-auto w-[90vw] md:max-w-[70vw] items-center relative">
        <span className=" font-bold text-white tracking-tighter text-2xl sm:text-3xl">
          <Link to={"/"}>Hotelbooking.com</Link>
        </span>
        <span className={`space-x-2 md:flex ${menu ? ' flex absolute top-10 right-0' : "hidden"}`}>
          {isLoggedin ? (
            <div className={`${menu && " flex flex-col bg-orange-400 px-2 py-3 rounded "}`}>
              <Link
                to={"/mybookings"}
                className=" py-2 px-3  text-white hover:bg-blue-700 cursor-pointer rounded-lg font-semibold
               
                "
              >
                My Bookings
              </Link>

              <Link
                to={"/my-hotels"}
                className=" py-2 px-3  text-white hover:bg-blue-700 cursor-pointer rounded-lg font-semibold"
              >
                My Hotels
              </Link>

              <Logout/>
            </div>
          ) : (
            <Link
              to={"/Sign-in"}
              className=" py-2 px-3 bg-white text-blue-700 hover:bg-gray-100 cursor-pointer rounded-lg font-semibold"
            >
              Sign In
            </Link>
          )}
        </span>
        <GiHamburgerMenu onClick={()=>{setMenu(!menu)}} className={`fill-white text-3xl cursor-pointer md:hidden`}/>
      </div>
    </div>
  );
}

export default Header;
