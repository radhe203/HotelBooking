import React from "react";
import { hotelTypes } from "../configs/hotel-options-configs";
type Props = {
  selectedHotels: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function HotelTypesFilter({ selectedHotels, onChange }: Props) {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Hotel Type</h4>
      {hotelTypes.map((hotelType) => (
        <label className="lg:flex items-center space-x-2 mr-3">
          <input
            type="checkbox"
            className="rounded"
            value={hotelType}
            checked={selectedHotels.includes(hotelType)}
            onChange={onChange}
          />
          <span>{hotelType}</span>
        </label>
      ))}
    </div>
  );
}

export default HotelTypesFilter;
