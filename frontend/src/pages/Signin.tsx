import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../apiClient";
import { useAppContext } from "../contexts/AppContexts";
import { Link, useNavigate } from "react-router-dom";

export type SigninFormData = {
  email: string;
  password: string;
};

function Signin() {
  const {showToast} = useAppContext()
  const navigate = useNavigate()
const queryClient = useQueryClient()
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<SigninFormData>();

  const mutation = useMutation(apiClient.SignIn,{
    onSuccess:async()=>{
        showToast({message:"Login Success" , type:"SUCCESS"})
        await queryClient.invalidateQueries('ValidateToken')
        navigate('/')
    },
    onError:(error:Error)=>{
        showToast({message:error.message , type:"ERROR"})
    } 
  })

  const onSubmit = handleSubmit((data)=>{
    mutation.mutate(data)
  })

  return (
    <form className="flex flex-col" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold mb-5">Sign In</h2>
      <label className="text-gray-700 text-sm font-bold">
        Email
        <input
          type="email"
          className="border border-blue-400 focus:border-blue-800 rounded w-full py-2 px-2 font-normal my-1 outline-none"
          {...register("email", { required: "This feild is required" })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
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
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <span className="flex items-center justify-between mt-5">
        <span className="text-sm text-gray-500">
          Havent Registered ? <Link to={'/register'} className=" text-blue-800">create an account</Link>
        </span>
      <button
        type="submit"
        className=" text-xl  p-3 bg-blue-600 rounded uppercase font-medium text-white"
      >
        Sign in
      </button>
      </span>
    </form>
  );
}

export default Signin;
