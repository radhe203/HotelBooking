import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContexts";
import Logout from "./Logout";

function Header() {
  const { isLoggedin } = useAppContext();
  return (
    <div className=" bg-blue-900 py-6">
      <div className="flex justify-between mx-auto w-[90vw] md:max-w-[70vw]">
        <span className=" font-bold text-white tracking-tighter text-2xl sm:text-3xl">
          <Link to={"/"}>Hotelbooking.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedin ? (
            <>
              <Link
                to={"/Sign-in"}
                className=" py-2 px-3  text-white hover:bg-blue-700 cursor-pointer rounded-lg font-semibold
               
                "
              >
                My Bookings
              </Link>

              <Link
                to={"/Sign-in"}
                className=" py-2 px-3  text-white hover:bg-blue-700 cursor-pointer rounded-lg font-semibold"
              >
                My Hotels
              </Link>

              <Logout/>
            </>
          ) : (
            <Link
              to={"/Sign-in"}
              className=" py-2 px-3 bg-white text-blue-700 hover:bg-gray-100 cursor-pointer rounded-lg font-semibold"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
}

export default Header;
