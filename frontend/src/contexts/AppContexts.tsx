import React, { createContext, useContext, useState } from "react";
import ShowToast from "../components/ShowToast";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContexts = {
  showToast: (toastMessage: ToastMessage) => void;
};

const AppContext = createContext<AppContexts | undefined>(undefined);

function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [Tosat, setToast] = useState<ToastMessage | undefined>(undefined);
  return (
    <AppContext.Provider
      value={{
        showToast: (toast) => {
        setToast(toast)
        },
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
