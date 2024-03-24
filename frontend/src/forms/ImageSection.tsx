import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForms";
import React from "react";

function ImageSection() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    
  } = useFormContext<HotelFormData>();

  const existingImageUrls = watch("imageUrls");

  function handleDelete(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) {

    event.preventDefault()
    setValue("imageUrls", existingImageUrls.filter((url) => url !== imageUrl));
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>

      <div className="flex flex-col gap-4 rounded border border-blue-800 p-3">
        {existingImageUrls && (
          <div className="grid grid-cols-6 gap-4">
            {existingImageUrls.map((url) => (
              <div className="relative group">
                <img src={url} className="min-h-full object-cover" />
                <button
                  type="button"
                  onClick={(event) => handleDelete(event, url)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white w-full"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          type="file"
          multiple
          accept="images/*"
          className=" text-gray-500 w-full text-sm"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const length = imageFiles.length + (existingImageUrls?.length || 0);
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
