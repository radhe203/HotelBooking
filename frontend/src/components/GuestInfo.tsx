import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSearchContext } from "../contexts/SearchContext";
import { useAppContext } from "../contexts/AppContexts";
import { useLocation, useNavigate } from "react-router-dom";
type Props = {
  hotelId: string;
  pricePerNight: number;
};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

function GuestInfo({ hotelId, pricePerNight }: Props) {
    const navigate = useNavigate()
    const location = useLocation()
    const search= useSearchContext()
    const {isLoggedin} = useAppContext()
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues:{
        adultCount:search?.adultCount,
        childCount:search?.childCount,
        checkIn:search?.checkIn,
        checkOut:search?.checkOut,
    }
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);


  function onSignInClick(data:GuestInfoFormData){
    search?.saveSearchValues(
        "",
        data.checkIn,
        data.checkOut,
        data.adultCount,
        data.childCount,
        ""
    )
    navigate('/sign-in', {state:{from:location}})
  }

  function onSubmit(data:GuestInfoFormData){
    search?.saveSearchValues(
        "",
        data.checkIn,
        data.checkOut,
        data.adultCount,
        data.childCount,
        ""
    )
    navigate(`/hotel${hotelId}/booking`, {state:{form:location}})
  }

  return (
    <form className="flex flex-col p-4 bg-blue-200 gap-4" onSubmit={isLoggedin ?  handleSubmit(onSubmit) :  handleSubmit(onSignInClick)}>
      <h3 className="text-md font-bold">
        <span className="font-bold text-xl">₹</span>
        {pricePerNight}
      </h3>
      <div>
        <DatePicker
          selected={checkIn}
          required
          onChange={(date: Date) => setValue("checkIn", date as Date)}
          selectsStart
          minDate={minDate}
          maxDate={maxDate}
          startDate={checkIn}
          endDate={checkOut}
          placeholderText="Check-in Date"
          className="min-w-full bg-white p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>
      <div>
        <DatePicker
          selected={checkOut}
          required
          onChange={(date: Date) => setValue("checkOut", date as Date)}
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
      <div className="flex bg-white px-2 py-1 gap-2">
        <label className="items-center flex">
          Adults:
          <input
            className="w-full min-w-10 p-1 focus:outline-none font-bold"
            type="number"
            min={1}
            max={20}
            {...register("adultCount", {
              required: "This feild is required",
              min: {
                value: 1,
                message: "There must be an adult",
              },
              valueAsNumber: true,
            })}
          />
        </label>
        <label className="items-center flex">
          Children:
          <input
            className="w-full p-1 min-w-10 focus:outline-none font-bold"
            type="number"
            min={0}
            max={20}
            {...register("childCount", {
              valueAsNumber: true,
            })}
          />
        </label>
      </div>
      {errors.adultCount && (
          <span className="text-red-500 text-xs">{errors.adultCount.message}</span>
        )}

        {isLoggedin ? (<button className="w-full p-3 bg-blue-500 text-white font-semibold ">Book Now</button>):(<button  className="w-full p-3 bg-blue-500 text-white font-semibold ">Sign in to book</button>)}
      </form>
  );
}

export default GuestInfo;
