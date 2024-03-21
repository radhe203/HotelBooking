import ManageHotelForms from '../forms/ManageHotelForms'
import * as apiClient from "../apiClient";
import { useMutation } from 'react-query';
import { useAppContext } from '../contexts/AppContexts';

function AddHotels() {
  const {showToast}= useAppContext()
  const {mutate,isLoading} = useMutation(apiClient.addMyHotel,{
    onSuccess:()=>{
      showToast({message:"Hotel added successfully",type:"SUCCESS"})
    },
    onError:(error:any)=>{
      showToast({message:error.message,type:"ERROR"})
    }
  });

  const handelSave = (hotelFormData:FormData)=>{
    mutate(hotelFormData)

  }
  return (
  <ManageHotelForms onSave={handelSave} isLoading={isLoading}/>
  )
}

export default AddHotels