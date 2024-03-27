import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../apiClient";
import React, { useState } from "react";
import SearchResultCard from "../components/SearchResultCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";
function Search() {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedstars] = useState<string[]>([]);
  const [selectedHotels, setSelectedhotels] = useState<string[]>([]);
  const [selectedFacilities, setselectedFacilities] = useState<string[]>([]);
  const [selectedPrice,setselectedPrice] = useState<number>()
  const [sortOption, setSortOption] = useState<string>("");

  console.log(page);
  const searchParams = {
    destination: search?.destination.toString(),
    checkIn: search?.checkIn.toISOString(),
    checkOut: search?.checkOut.toISOString(),
    childCount: search?.childCount.toString(),
    adultCount: search?.adultCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    type: selectedHotels,
    facilities:selectedFacilities,
    maxPrice:selectedPrice,
    sortOption
  };
  const { data: hotelData } = useQuery(["searchHotels", searchParams], () =>
    apiClient.searchHotels(searchParams)
  );

  function handleStarsChange(event: React.ChangeEvent<HTMLInputElement>) {
    const starRating = event.target.value;

    setSelectedstars((prev) =>
      event.target.checked
        ? [...prev, starRating]
        : prev.filter((star) => star != starRating)
    );
  }

  function handleselectedHotels(event: React.ChangeEvent<HTMLInputElement>) {
    const hotelType = event.target.value;

    setSelectedhotels((prev) =>
      event.target.checked
        ? [...prev, hotelType]
        : prev.filter((type) => type != hotelType)
    );
  }

  function handleFacilityChange(event: React.ChangeEvent<HTMLInputElement>) {
    const facility = event.target.value;

    setselectedFacilities((prev) =>
      event.target.checked
        ? [...prev, facility]
        : prev.filter((f) => f != facility)
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />
          <HotelTypesFilter
            selectedHotels={selectedHotels}
            onChange={handleselectedHotels}
          />
          <FacilitiesFilter
            selectedFacilities={selectedFacilities}
            onChange={handleFacilityChange}
          />
          <PriceFilter
          selectedPrice={selectedPrice}
          onChange={(value?: number) => setselectedPrice(value)}
        />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {hotelData?.pagination.total} Hotels found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
          <select
          value={sortOption}
          onChange={(event) => setSortOption(event.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">Sort By</option>
          <option value="starRating">Star Rating</option>
          <option value="pricePerNightAsc">
            Price Per Night (low to high)
          </option>
          <option value="pricePerNightDesc">
            Price Per Night (high to low)
          </option>
        </select>
        </div>
        {hotelData?.data.map((hotel) => (
          <SearchResultCard hotel={hotel} />
        ))}
        <div>
          <Pagination
            page={hotelData?.pagination.page || 1}
            pages={hotelData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
}

export default Search;
