import { useQuery } from "react-query";
import Slider from "../components/Slider";
import * as apiClient from "./../apiClient";
import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaUser } from "react-icons/fa";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Home.css";

// import required modules
import { EffectFlip, Pagination, Navigation, Autoplay } from "swiper/modules";
import { AiFillStar } from "react-icons/ai";
import Hero2 from "../components/Hero2/Hero2";

function Home() {
  const { data: topBookings } = useQuery("topBookings", () => {
    return apiClient.topBookings();
  });


  // const hotel = topBookings.hotel || [];
  // // const topBook = topBookings?.topBooking || [];

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  if (!topBookings) {
    return <></>;
  }
  const booking:any = topBookings.topBooking;
  return (
    <>
      <Hero2 />
      <Slider />
      <div className="my-20">
        <div className="flex flex-col ">
          <div>
            <p className="px-3 py-2 uppercase bg-blue-500 text-white w-fit">
              Based on top most bookings
            </p>
            <hr className=" border-none bg-blue-500 h-[2px] mb-5" />
          </div>

          {topBookings?.hotels.map((top: HotelType, index) => {
            return (
              <div
                key={top._id}
                className="flex flex-col md:flex-row gap-2 py-3 my-5"
              >
                {/* <img src={top.imageUrls[0]} className=" md:w-[300px]" /> */}
                <Link className="" to={`/detail/${top._id}`}>
                  <Swiper
                    effect={"flip"}
                    grabCursor={true}
                    // pagination={true}
                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                    modules={[EffectFlip, Pagination, Navigation, Autoplay]}
                    className="home-hotels"
                  >
                    {top.imageUrls.map((imageUrl) => (
                      <SwiperSlide key={imageUrl}>
                        <img src={imageUrl} alt="" className=" hotel-image"/>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Link>
                <div className="relative">
                  <Link
                    to={`/detail/${top._id}`}
                    className="text-[22px] font-bold hover:underline"
                  >
                    {top.name}
                  </Link>
                  <p className="text-sm text-gray-500 ">
                    {top.country},{top.city}
                  </p>

                  <span className="flex mt-3">
                    {Array.from({ length: top.starRating }).map(() => (
                      <AiFillStar className="fill-yellow-400" />
                    ))}
                  </span>

                  <p className="text-sm text-gray-500 line-clamp-3 mt-3">
                    {top.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {top.facilities.map((facility) => {
                      return (
                        <span className="p-1 text-sm bg-blue-800 font-semibold text-white rounded">
                          #{facility}
                        </span>
                      );
                    })}
                  </div>
                  {booking  && (
                    <div className="flex  gap-2 p-3 items-center static top-0 right-0 md:absolute">
                      <span>
                        <FaUser className=" fill-blue-800" />
                      </span>
                      Total Bookings.  {booking[index].totalBookings}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="my-12 flex justify-center">
        <Link to={"/search"} className=" text-blue-800">
          Explore More...
        </Link>
      </div>
    </>
  );
}

export default Home;
