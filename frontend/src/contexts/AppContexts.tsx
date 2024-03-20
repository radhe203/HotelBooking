import React, { createContext, useContext, useState } from "react";
import ShowToast from "../components/ShowToast";
import { useQuery } from "react-query";
import * as apiClient from "../apiClient";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContexts = {
  showToast: (toastMessage: ToastMessage) => void,
  isLoggedin:boolean
};

const AppContext = createContext<AppContexts | undefined>(undefined);

function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [Tosat, setToast] = useState<ToastMessage | undefined>(undefined);
  const {isError} = useQuery("ValidateToken",apiClient.ValidateToken,{
    retry:false,
  })
  return (
    <AppContext.Provider
      value={{
        showToast: (toast) => {
        setToast(toast)
        },
        isLoggedin:!isError,
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
