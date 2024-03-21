import { useFormContext } from 'react-hook-form';
import { HotelFormData } from './ManageHotelForms';

function GuestSection() {
    const { register,formState:{errors} } = useFormContext<HotelFormData>();

  return (
    <div>
         <h2 className="text-2xl font-bold mb-3">Guests</h2>
        <div className="flex gap-4 bg-gray-300 py-3 px-5">
        <label className="flex-1">
          Adults
          <input
            type="number"
            min={1}
            className="border border-blue-400 focus:border-blue-800 rounded w-full py-2 px-2 font-normal my-1 outline-none"
            {...register("adultCount", { required: "This feild is required" })}
          />
          {errors.adultCount && (
            <span className="text-red-500">{errors.adultCount.message}</span>
          )}
        </label>

        <label className="flex-1">
          Children
          <input
            type="number"
            min={0}
            className="border border-blue-400 focus:border-blue-800 rounded w-full py-2 px-2 font-normal my-1 outline-none"
            {...register("childCount", { required: "This feild is required" })}
          />
          {errors.childCount && (
            <span className="text-red-500">{errors.childCount.message}</span>
          )}
        </label>
      </div>
    </div>
  )
}

export default GuestSection