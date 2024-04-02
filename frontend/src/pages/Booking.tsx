import { useQuery } from "react-query";
import * as apiclient from "../apiClient";

import BookingForm from "../forms/BookingForms/BookingForm";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import BookingDetailSummury from "../components/BookingDetailSummury";
import { HotelType } from "../../../backend/src/shared/types";
import { useAppContext } from "../contexts/AppContexts";
import { Elements } from "@stripe/react-stripe-js";

function Booking() {
  const { stripePromise } = useAppContext();
  const { hotelId } = useParams();
  const [numberOfNights, setNumberOfNights] = useState<number>(0);
  const search = useSearchContext();
  const { data: hotel } = useQuery(
    "viewHotelById",
    () => apiclient.viewHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );

  const { data: currentUser } = useQuery("currentUser", apiclient.me);
  useEffect(() => {
    if (search?.checkIn && search.checkOut) {
      const nights = Math.abs(
        (search.checkOut.getTime() - search.checkIn.getTime()) /
          (1000 * 60 * 60 * 24)
      );
      setNumberOfNights(Math.ceil(nights));
    }
  }, [, search?.checkIn, search?.checkOut]);

  const { data: paymentIntentData } = useQuery(
    "paymentIntentData",
    () => {
      return apiclient.createpaymentIntent(
        hotelId as string,
        numberOfNights as number
      );
    },
    {
      enabled: !!hotelId && numberOfNights > 0,
    }
  );

  return (
    <div className="grid md:grid-cols-[1fr_2fr] gap-6">
      <BookingDetailSummury
        checkIn={search?.checkIn as Date}
        checkOut={search?.checkOut as Date}
        adultCount={search?.adultCount as number}
        childCount={search?.childCount as number}
        numberOfNights={numberOfNights as number}
        hotel={hotel as HotelType}
      />
      {currentUser && paymentIntentData && (
        <Elements stripe={stripePromise} options={{
          clientSecret: paymentIntentData.clientSecret,
        }}>
          <BookingForm currentUser={currentUser} paymentIntent={paymentIntentData} />
        </Elements>
      )}
    </div>
  );
}

export default Booking;
