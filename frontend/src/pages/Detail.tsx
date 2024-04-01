import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiclient from "../apiClient";
import { AiFillStar } from "react-icons/ai";
import GuestInfo from "../components/GuestInfo";

function Detail() {
  const { hotelId } = useParams();
  const { data: hotel } = useQuery(
    "viewHotelById",
    () => {
      return apiclient.viewHotelById(hotelId as string);
    },
    {
      enabled: !!hotelId,
    }
  );
  console.log(hotel);

  if (!hotel) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" space-y-6">
      <span className=" flex ">
        {Array.from({ length: hotel.starRating }).map(() => {
          return <AiFillStar className=" fill-yellow-400" />;
        })}
      </span>
      <h1 className=" text-3xl font-bold">{hotel.name}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {hotel.imageUrls.map((image) => {
          return (
            <div className=" w-[300px]">
              <img
                src={image}
                alt={hotel.name}
                className="w-full h-full rounded object-cover object-center"
              />
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {
            hotel.facilities.map((facility) => (
                <div className=" border border-slate-300 rounded-sm p-3 "> {facility}</div>
            ))
        }
      </div>

      <div className=" grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div className=" whitespace-pre-line">{hotel.description}</div>
        <div className="h-fit">
            <GuestInfo pricePerNight={hotel.pricePerNight} hotelId={hotel._id}/>
        </div>
      </div>
    </div>
  );
}

export default Detail;
