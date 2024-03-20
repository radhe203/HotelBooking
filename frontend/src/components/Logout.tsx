import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../apiClient";
import { useAppContext } from "../contexts/AppContexts";

function Logout() {
    const queryClient= useQueryClient()
  const {showToast} = useAppContext()

    const mutation = useMutation(apiClient.logout,{
        onSuccess:async ()=>{
           await queryClient.invalidateQueries('ValidateToken')
           showToast({message:"Log out success" , type:"SUCCESS"})
        },
        onError:(error:Error)=>{
            showToast({message:error.message , type:"ERROR"})
        }
    })

    function handelClick(){
        mutation.mutate()
    }
  return (
    <button
      className=" py-2 px-3 bg-white text-blue-700 hover:bg-gray-100 cursor-pointer rounded-lg font-semibold"
    onClick={handelClick}
    >
      Log out
    </button>
  );
}

export default Logout;
