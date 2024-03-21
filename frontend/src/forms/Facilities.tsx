import { useFormContext } from 'react-hook-form';
import { HotelFormData } from './ManageHotelForms';
import { hotelFacilities } from '../configs/hotel-options-configs';
function Facilities() {
    const { register,formState:{errors} } = useFormContext<HotelFormData>();
    return (
      <div>
        <h2 className="text-2xl font-bold mb-3">Facilities</h2>
        <div className="grid grid-cols-5 gap-2">
          {hotelFacilities.map((facility) => (
            <label key={facility} className='flex gap-1 text-sm items-center text-gray-700'>
              <input
                type="checkbox"
                {...register("facilities", { required: "This feild is required" })}
                value={facility}
              />
              <span>{facility}</span>
            </label>
          ))}
        </div>
        {errors.facilities && <p className="text-red-500">{errors.facilities.message}</p>  }
      </div>
    );
}

export default Facilities