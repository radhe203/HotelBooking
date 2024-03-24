import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../apiClient";
import ManageHotelForms from "../forms/ManageHotelForms";
import { useAppContext } from "../contexts/AppContexts";
function EditHotel() {
  const {showToast}= useAppContext()

const { hotelId } = useParams();

  const { data: hotel } = useQuery(
    "fetchMyHotelById",
    () => apiClient.fetchMyHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );

  const {mutate ,isLoading} = useMutation(apiClient.updateMyHotel,
    {
      onSuccess: () => {
       showToast({ message: "Hotel updated successfully", type: "SUCCESS" });
      },
      onError:()=>{
        showToast({ message: "Error updating hotel", type: "ERROR" });
      }
    }
  )

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };
 
  return <ManageHotelForms hotel={hotel} onSave={handleSave} isLoading={isLoading}/>;
}

export default EditHotel;
