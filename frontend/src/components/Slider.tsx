// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import * as apiClient from "../apiClient";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./slider.css";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

export default function Slider() {
  const {
    data: topHotels,
    isLoading,
    error,
  } = useQuery("topHotel", () => {
    return apiClient.topHotels(); // Assuming apiClient is correctly defined
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div></div>;
  }
  // console.log(topHotels)
  console.log(topHotels);
  
  const topHotel =
    topHotels?.data.map((hotel) => {
      return hotel;
    }) ?? [];

  return (
    <>
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
        autoplay={{ delay: 2000, disableOnInteraction: false }}
      >
        {topHotel.map((hotel,) => (
          <SwiperSlide key={hotel._id}>
            <div className="w-full h-full group slide">
              <img src={hotel.imageUrls[0]} alt="" className="w-full h-full " />
              <Link to={`/detail/${hotel._id}`} className="slide-data ">
                <div className=" text-left absolute bottom-5 left-10">
                  <h1 className="text-white text-3xl font-bold">
                    {hotel.name}
                  </h1>
                  <p className="text-white text-xl font-bold  mt-2">
                    {hotel.country},{hotel.city},
                  </p>

                  <span className="flex">
                    {Array.from({ length: hotel.starRating }).map(() => (
                      <AiFillStar className="fill-yellow-400" />
                    ))}
                  </span>
                  <p className=" text-gray-200 text-xs line-clamp-2 mt-2">
                    {hotel.description}
                  </p>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
