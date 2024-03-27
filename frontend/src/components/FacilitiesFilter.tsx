import React from "react";
import { hotelFacilities } from "../configs/hotel-options-configs";

type Props = {
    selectedFacilities: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function FacilitiesFilter({ selectedFacilities, onChange }: Props) {
  
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Facility</h4>
      {hotelFacilities.map((Facility) => (
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={Facility}
            checked={selectedFacilities.includes(Facility)}
            onChange={onChange}
          />
          <span>{Facility}</span>
        </label>
      ))}
    </div>
  );
}

export default FacilitiesFilter
