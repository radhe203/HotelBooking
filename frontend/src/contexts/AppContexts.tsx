import React, { createContext, useContext, useState } from "react";
import ShowToast from "../components/ShowToast";
import { useQuery } from "react-query";
import * as apiClient from "../apiClient";
import { loadStripe,Stripe } from "@stripe/stripe-js";
// const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || ""
type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContexts = {
  showToast: (toastMessage: ToastMessage) => void,
  isLoggedin:boolean,
  stripePromise:Promise<Stripe | null>,
};

const AppContext = createContext<AppContexts | undefined>(undefined);

function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [Tosat, setToast] = useState<ToastMessage | undefined>(undefined);
  const {isError} = useQuery("ValidateToken",apiClient.ValidateToken,{
    retry:false,
  })

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY || "");

  return (
    <AppContext.Provider
      value={{
        showToast: (toast) => {
        setToast(toast)
        },
        isLoggedin:!isError,
        stripePromise
      }}
    >
      {Tosat && (
        <ShowToast
          message={Tosat.message}
          type={Tosat.type}
          onClose={() => {
            setToast(undefined);
          }}
        />
      )}
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  return context as AppContexts;
}

export default AppContextProvider;
