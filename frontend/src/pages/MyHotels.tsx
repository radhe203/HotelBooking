import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
import * as apiClient from "../apiClient";
function MyHotels() {

  
    const { data: hotelData } = useQuery(
      "fetchMyHotels",
      apiClient.fetchMyHotel,
      {
        onError: () => {},
      }
    );


  if (!hotelData) {
    return <span>No Hotel Found</span>;
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to={`/add-hotels`}
          className=" bg-blue-800 text-white hover:opacity-90 font-bold px-3 py-2"
        >
          Add hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {hotelData.map((hotel) => (

    <div
            data-testid="hotel-card"
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
          >
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-line line-clamp-2">{hotel.description}</div>
            <div className="flex  flex-wrap  gap-2">
              <div className="border border-slate-300 rounded-sm p-3 flex items-center ">
                <BsMap className="mr-1" />
                <span className="line-clamp-2">{hotel.city}, {hotel.country}</span>
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsBuilding className="mr-1" />
                {hotel.type}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiMoney className="mr-1" /><span className="font-bold text-xl text-gray-500">₹</span>{hotel.pricePerNight} per night
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiHotel className="mr-1" />
                {hotel.adultCount} adults, {hotel.childCount} children
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiStar className="mr-1" />
                {hotel.starRating} Star Rating
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyHotels;
