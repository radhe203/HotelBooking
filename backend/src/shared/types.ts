export type HotelType = {
    _id: string;
    userId: string;
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    adultCount: number;
    childCount: number;
    facilities: string[];
    pricePerNight: number;
    starRating: number;
    imageUrls: string[];
    lastUpdated: Date;
    bookings: BookingType[];
};

export type HotelSearchResponse = {
    data: HotelType[];
    pagination: {
        page: number;
        pages: number;
        total: number;
    };
}

export type userType = {
    _id: string,
    email: string,
    password: string,
    firstname: string,
    lastname: string
}


export type paymentIntentResponse={
    paymentIntentId:string,
    clientSecret:string,
    totalCost:string
}

export type BookingType = {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    adultCount: number;
    childCount: number;
    checkIn: Date;
    checkOut: Date;
    totalCost: number;
  };
