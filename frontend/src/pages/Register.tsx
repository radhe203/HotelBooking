import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../apiClient";
import { useAppContext } from "../contexts/AppContexts";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
};



function Register() {
  const { register,watch,handleSubmit,formState:{errors} } = useForm<RegisterFormData>();
  const {showToast} = useAppContext()
  const navigate = useNavigate()
  const mutaion = useMutation(apiClient.register,{
    onSuccess:()=>{
      showToast({message:"Register Success" , type:"SUCCESS"})
      navigate("/")
    },
    onError:(error:Error)=>{
      showToast({message:error.message , type:"ERROR"})

    }
  })

  const onSubmit = handleSubmit((data)=>{
    mutaion.mutate(data)
  })

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Create an account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 flex-1 text-sm font-bold">
          Firstname
          <input
            type="text"
            className="border border-blue-400 focus:border-blue-800 rounded w-full py-2 px-2 font-normal my-1 outline-none"
            {...register("firstname", { required: "This feild is required" })}
          />
          {errors.firstname && <span className="text-red-500">{errors.firstname.message}</span>}
        </label>

        <label className="text-gray-700 flex-1 text-sm font-bold">
          Lastname
          <input
            type="text"
            className="border border-blue-400 focus:border-blue-800 rounded w-full py-2 px-2 font-normal my-1 outline-none"
            {...register("lastname", { required: "This feild is required" })}
          />
          {errors.lastname && <span className="text-red-500">{errors.lastname.message}</span>}
        
        </label>
      </div>

      <label className="text-gray-700 text-sm font-bold">
        Email
        <input
          type="email"
          className="border border-blue-400 focus:border-blue-800 rounded w-full py-2 px-2 font-normal my-1 outline-none"
          {...register("email", { required: "This feild is required" })}
        />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}

      </label>

      <label className="text-gray-700  text-sm font-bold">
          password
          <input
            type="password"
            className="border border-blue-400 focus:border-blue-800 rounded w-full py-2 px-2 font-normal my-1 outline-none"
            {...register("password", {
              required: "This feild is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}

        </label>

        <label className="text-gray-700 text-sm font-bold">
          Confirm password
          <input
            type="password"
            className="border border-blue-400 focus:border-blue-800 rounded w-full py-2 px-2 font-normal my-1 outline-none"
            {...register("confirmPassword", {
              validate:(val)=>{
                if(!val){
                  return "this feild is required"
                }else if(watch("password") !== val){
                  return "password do not match"
                }
              }
            })}
          />
            {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}

        </label>
       
          <button type="submit" className=" text-xl w-full p-3 bg-blue-600 rounded uppercase font-medium text-white">Create Account</button>

    </form>
  );
}

export default Register;
