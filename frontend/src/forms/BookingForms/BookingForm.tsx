import { useForm } from "react-hook-form";
import {
  paymentIntentResponse,
  userType,
} from "../../../../backend/src/shared/types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement} from "@stripe/stripe-js";
import { useSearchContext } from "../../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import * as apiclient from "../../apiClient";
import { useAppContext } from "../../contexts/AppContexts";

type Props = {
  currentUser: userType;
  paymentIntent: paymentIntentResponse;
};

export type BookingFormData = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  hotelId: string;
  paymentIntentId: string;
  totalCost: number;
};

function BookingForm({ currentUser, paymentIntent }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const search = useSearchContext();
  const { hotelId } = useParams();
  const {showToast} = useAppContext()
  const { handleSubmit, register  } = useForm<BookingFormData>({
    defaultValues: {
      userId:currentUser._id,
      firstName: currentUser.firstname,
      lastName: currentUser.lastname,
      email: currentUser.email,
      adultCount: search?.adultCount,
      childCount: search?.childCount,
      checkIn: search?.checkIn?.toISOString(),
      checkOut: search?.checkOut?.toISOString(),
      totalCost: parseInt(paymentIntent.totalCost),
      paymentIntentId: paymentIntent.paymentIntentId,
      hotelId: hotelId,
    },
  });
  const { mutate: bookRoom,isLoading,error } = useMutation(apiclient.createRoomBooking, {
    onSuccess: () => {
      showToast({message:"Booking Successfull" ,type:"SUCCESS"})
    },
    onError: () => {  
      showToast({message:"Booking Failed" ,type:"ERROR"})
      console.log(error)

    },
  });

  async function onSubmit(formData: BookingFormData) {
    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });
    // console.log(result)
    // i am getting this error "message: "As per Indian regulations, export transactions require a description. More info here: https://stripe.com/docs/india-exports"" ---- for temp i am skiping it
    if (result.paymentIntent?.status === "succeeded") {
      bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
    }
    const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    if (result) {
      bookRoom({ ...formData, paymentIntentId: id });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-3"
    >
      <span className="text-3xl font-bold">Confirm Your Details</span>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-gray-700 text-sm font-bold flex-1">
            First Name
          </label>
          <input
            type="text"
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200"
            {...register("firstName")}
            readOnly
            disabled
          />
        </div>
        <div>
          <label className="text-gray-700 text-sm font-bold flex-1">
            Last Name
          </label>
          <input
            type="text"
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200"
            {...register("lastName")}
            readOnly
            disabled
          />
        </div>
      </div>
      <div>
        <label className="text-gray-700 text-sm font-bold flex-1">Email</label>
        <input
          type="text"
          className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200"
          {...register("email")}
          readOnly
          disabled
        />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your price summary</h2>
        <div className=" bg-blue-200 p-4 rounded-md">
          <div className="font-bold">
            Total cost : <span className="font-bold  text-gray-800">₹</span>{" "}
            {paymentIntent.totalCost}
          </div>
          <div className="text-xs"> Includes charges and taxes</div>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Payment Details</h2>
        <CardElement
          id="payment-element"
          className="border rounded p-2 text-sm"
        />
      </div>
      <div className="">
        <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 text-white py-2 font-semibold hover:bg-blue-500 dis]
        disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out w-full rounded-md"
        >
          {isLoading ? "Loading..." : "Confirm Now"}
        </button>
      </div>
    </form>
  );
}

export default BookingForm;
