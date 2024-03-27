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
  const [destination, setDestination] = useState<string | undefined>("");
  const [checkIn, setCheckIn] = useState<Date | undefined>(new Date());
  const [checkOut, setCheckOut] = useState<Date | undefined>(new Date());
  const [adultCount, setAdultCount] = useState<number | undefined>(1);
  const [childCount, setChildCount] = useState<number |undefined>(0);
  const [hotelId, setHotelId] = useState<string | undefined>("");

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
