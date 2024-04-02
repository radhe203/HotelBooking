import React, { createContext, useContext, useState } from "react";

export type SearchContext = {
  destination: string | undefined;
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  adultCount: number | undefined;
  childCount: number | undefined;
  hotelId: string | undefined;

  saveSearchValues: (
    destination: string | undefined,
    checkIn: Date | undefined,
    checkOut: Date | undefined,
    adultCount: number | undefined,
    childCount: number | undefined,
    hotelId: string | undefined
  ) => void;
};

type SearchContextProviderProps = {
  children: React.ReactNode;
};

const SearchContext = createContext<SearchContext | undefined>(undefined);

function SearchContextProvider({ children }: SearchContextProviderProps) {
  const [destination, setDestination] = useState<string | undefined>(()=>(
    sessionStorage.getItem("destination") || ""
  ));
  const [checkIn, setCheckIn] = useState<Date | undefined>(()=>(
   new Date(sessionStorage.getItem("checkIn") || new Date().toISOString())
  ));
  const [checkOut, setCheckOut] = useState<Date | undefined>(()=>(
    new Date(sessionStorage.getItem("checkOut") || new Date().toISOString())
   ));
  const [adultCount, setAdultCount] = useState<number | undefined>(()=>(
    parseInt(sessionStorage.getItem("adultCount") || "1")
  ));
  const [childCount, setChildCount] = useState<number |undefined>(()=>(
    parseInt(sessionStorage.getItem("childCount") || "0")
  ));
  const [hotelId, setHotelId] = useState<string | undefined>(()=>(
    sessionStorage.getItem("hotelId") || ""
  ));

  function saveSearchValues(
    destination?: string,
    checkIn?: Date,
    checkOut?: Date,
    adultCount?: number,
    childCount?: number,
    hotelId?: string
  ) {
    setDestination(destination);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    setAdultCount(adultCount);
    setChildCount(childCount);
    if (hotelId) {
      setHotelId(hotelId);
    }
  sessionStorage.setItem("destination", destination || "");
  sessionStorage.setItem("checkIn", checkIn?.toISOString() || "");
  sessionStorage.setItem("checkOut", checkOut?.toISOString() || "");
  sessionStorage.setItem("adultCount", adultCount?.toString() || "");
  sessionStorage.setItem("childCount", childCount?.toString() || "");
  sessionStorage.setItem("hotelId", hotelId || "");
  }

  

  return (
    <SearchContext.Provider
      value={{
        destination,
        checkIn,
        checkOut,
        adultCount,
        childCount,
        hotelId,

        saveSearchValues,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  return context;
};

export default SearchContextProvider;
