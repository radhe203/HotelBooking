import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../configs/hotel-options-configs";
import { HotelFormData } from "./ManageHotelForms";
function TypesSection() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  const typeWatch = watch("type");
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Type</h2>
      <div className="grid grid-cols-5 gap-2">
        {hotelTypes.map((type) => (
          <label
            key={type}
            className={
              typeWatch === type
                ? "bg-blue-800 text-white rounded-3xl py-2 px-4 font-semibold"
                : " font-medium bg-gray-300 rounded-3xl py-2 px-4 cursor-pointer"
            }
          >
            <input
              type="radio"
              {...register("type", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return "At least one facility is required";
                  }
                },
              })}
              value={type}
              className=" hidden"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && <p className="text-red-500">{errors.type.message}</p>}
    </div>
  );
}

export default TypesSection;
