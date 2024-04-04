import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
function SearchBar() {
    const navigate = useNavigate()
  const search = useSearchContext();
  const [destination, setDestination] = useState<string | undefined>(search?.destination);
  const [checkIn, setCheckIn] = useState<Date | undefined>(search?.checkIn);
  const [checkOut, setCheckOut] = useState<Date | undefined>(search?.checkOut);
  const [adultCount, setAdultCount] = useState<number | undefined>(search?.adultCount);
  const [childCount, setChildCount] = useState<number | undefined>(search?.childCount);
  const [hotelId, setHotelId] = useState<string | undefined>(search?.hotelId);

  const handelSubmit = (event: FormEvent) => {
    event.preventDefault();
    search?.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount,
      hotelId
    );
    setHotelId(hotelId)
    navigate('/search')
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
      onSubmit={handelSubmit}
      className="-mt-8 p-3 bg-orange-400 rounded shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4"
    >
      <div className="flex flex-row items-center flex-1 bg-white p-2">
        <MdTravelExplore className="mr-2" size={25} />
        <input
          type="text"
          placeholder="where are you going"
          className="w-full text-md focus:outline-none"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>

      <div className="flex bg-white px-2 py-1 gap-2">
        <label className="items-center flex">
          Adults:
          <input
            className="w-full min-w-10 p-1 focus:outline-none font-bold"
            type="number"
            min={1}
            max={20}
            value={adultCount}
            onChange={(event) => setAdultCount(parseInt(event.target.value))}
          />
        </label>
        <label className="items-center flex">
          Children:
          <input
            className="w-full p-1 min-w-10 focus:outline-none font-bold"
            type="number"
            min={0}
            max={20}
            value={childCount}
            onChange={(event) => setChildCount(parseInt(event.target.value))}
          />
        </label>
      </div>
      <div>
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="min-w-full bg-white p-2 focus:outline-none z-50"
          wrapperClassName="min-w-full"
        />
      </div>

      <div>
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          minDate={minDate}
          maxDate={maxDate}
          startDate={checkIn}
          endDate={checkOut}
          placeholderText="Check-Out Date"
          className="min-w-full bg-white p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>
      <div className="flex gap-1">
        <button type="submit" className="w-2/3 bg-blue-600 text-white h-full p-2 font-bold text-xl hover:bg-blue-500">
          Search
        </button>
        <button  className="w-1/3 bg-red-600 text-white h-full p-2 font-bold text-xl hover:bg-red-500">
          Clear
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
