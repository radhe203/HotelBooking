import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForms";

function DetilSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
      <label className="text-gray-700 flex-1 text-sm font-bold">
        Name
        <input
          type="text"
          className="border border-blue-400 focus:border-blue-800 rounded w-full py-2 px-2 font-normal my-1 outline-none"
          {...register("name", { required: "This feild is required" })}
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </label>

      <div className="flex gap-4 ">
        <label className="text-gray-700 flex-1 text-sm font-bold">
          City
          <input
            type="text"
            className="border border-blue-400 focus:border-blue-800 rounded w-full py-2 px-2 font-normal my-1 outline-none"
            {...register("city", { required: "This feild is required" })}
          />
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </label>

        <label className="text-gray-700 flex-1 text-sm font-bold">
          Country
          <input
            type="text"
            className="border border-blue-400 focus:border-blue-800 rounded w-full py-2 px-2 font-normal my-1 outline-none"
            {...register("country", { required: "This feild is required" })}
          />
          {errors.country && (
            <span className="text-red-500">{errors.country.message}</span>
          )}
        </label>
      </div>
      <label className="text-gray-700 flex-1 text-sm font-bold">
        Description
        <textarea
          rows={10}
          className="border border-blue-400 focus:border-blue-800 rounded w-full py-2 px-2 font-normal my-1 outline-none resize-none"
          {...register("description", { required: "This feild is required" })}
        ></textarea>
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>

      <label className="text-gray-700 flex-1 text-sm font-bold">
        Price Per Night
        <input
          type="number"
          className="border min-w-[50%] block border-blue-400 focus:border-blue-800 rounded py-2 px-2 font-normal my-1 outline-none"
          {...register("pricePerNight", { required: "This feild is required" })}
        />
        {errors.pricePerNight && (
          <span className="text-red-500">{errors.pricePerNight.message}</span>
        )}
      </label>

      <label className="text-gray-700 flex-1 text-sm font-bold">
        Star Ratings
        <select
          {...register("starRating", { required: "This feild is required" })}
          className="border block rounded w-[50%] p-2 text-gray-700 font-normal"
        >
          <option value={""} className="text-sm font-bold">
            Select as Rating
          </option>
          {[1, 2, 3, 4, 5].map((item, index) => (
            <option value={item} key={index} className="text-sm font-bold">
              {item}
            </option>
          ))}
        </select>
        {errors.starRating && (
          <span className="text-red-500">{errors.starRating.message}</span>
        )}
      </label>
    </div>
  );
}

export default DetilSection;
