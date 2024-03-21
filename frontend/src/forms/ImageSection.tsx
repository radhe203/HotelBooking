import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForms";

function ImageSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
      <div className="flex flex-col gap-4 rounded border border-blue-800 p-3">
        <input
          type="file"
          multiple
          accept="images/*"
          className=" text-gray-500 w-full text-sm"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const length = imageFiles.length;
              if (length === 0) {
                return "Please select at least one image";
              } else if (length > 6) {
                return "Total numbers of images cannot be more than 6";
              } else {
                return true;
              }
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500">{errors.imageFiles.message}</span>
      )}
    </div>
  );
}

export default ImageSection;
