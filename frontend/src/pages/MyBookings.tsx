import { useQuery } from "react-query"
import * as apiClient from "../apiClient"



function MyBookings() {


    const {data:hotels} = useQuery("fetchMyBookings",()=>{
        return apiClient.fetchMyBookings()
    })


    if(!hotels) return (
        <div className="flex justify-center items-center h-screen">
            <h1 className="text-3xl font-bold">Loading...</h1>
        </div>
    )

    if(hotels.length === 0) return (
        <div className="flex justify-center items-center h-screen">
            <h1 className="text-3xl font-bold">No bookings found</h1>
        </div>
    )


  return (
    <div className="space-y-5">
    <h1 className="text-3xl font-bold">My Bookings</h1>
    {hotels.map((hotel) => (
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5">
        <div className="lg:w-full lg:h-[250px]">
          <img
            src={hotel.imageUrls[0]}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
          <div className="text-2xl font-bold">
            {hotel.name}
            <div className="text-xs font-normal">
              {hotel.city}, {hotel.country}
            </div>
          </div>
          {hotel.bookings.map((booking) => (
            <div>
              <div>
                <span className="font-bold mr-2">Dates: </span>
                <span>
                  {new Date(booking.checkIn).toDateString()} -
                  {new Date(booking.checkOut).toDateString()}
                </span>
              </div>
              <div>
                <span className="font-bold mr-2">Guests:</span>
                <span>
                  {booking.adultCount} adults, {booking.childCount} children
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
  )
}

export default MyBookings