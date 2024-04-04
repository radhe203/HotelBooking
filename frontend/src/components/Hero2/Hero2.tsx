import { Link } from "react-router-dom";
import webIMAGE from "./Hotel_web.jpg";
function Hero2() {
  return (
    <div className=" min-w-full min-h-[100vh] relative">
      <img src={webIMAGE} className="w-full h-fit" />
      <div className=" absolute w-full h-full top-0">
        <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
          <h1 className="text-slate-100 font-bold text-3xl lg:text-6xl">
            Find your next <span className="text-blue-500">comfort</span>
            <br />
            place with ease
          </h1>
          <div className="text-gray-100 text-xs sm:text-sm">
            Discover unparalleled comfort. Trust us to curate your exceptional
            stay,every destination.
            <br />
            Begin your adventure by exploring our vast selection of
            accommodations
          </div>
          <Link
            to={"/search"}
            className="py-2 px-3 border rounded border-blue-500 w-fit text-white hover:bg-blue-500 hover:border-white delay-300"
          >
            Explore more...
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero2;
