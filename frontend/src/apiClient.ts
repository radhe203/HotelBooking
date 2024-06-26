
import { RegisterFormData } from "./pages/Register";
import { SigninFormData } from "./pages/Signin";
import { HotelSearchResponse, HotelType, paymentIntentResponse, userType } from "../../backend/src/shared/types";
import { BookingFormData } from "./forms/BookingForms/BookingForm";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";


export async function me(): Promise<userType> {
    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch user");
    }

    return response.json();
}

export async function register(formData: RegisterFormData) {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    const responseBody = await response.json();
    if (!response.ok) {
        throw new Error(responseBody.message);
    }
}

export async function SignIn(formData: SigninFormData) {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    const body = await response.json();
    if (!response.ok) {
        throw new Error(body.message);
    }
    return body;
}

export async function logout() {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        credentials: "include",
        method: "POST"
    })

    if (!response.ok) {
        throw new Error("Failed to logout");
    }
}

export async function ValidateToken() {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: "include"
    })

    if (!response.ok) {
        throw new Error("Invalid token");
    }
    return response.json();
}


export async function addMyHotel(hotelFormData: FormData) {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        method: "POST",
        credentials: "include",
        body: hotelFormData
    })

    if (!response.ok) {
        throw new Error("Failed to add hotels");
    }
    return response.json();
}


export async function fetchMyHotel(): Promise<HotelType[]> {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        credentials: "include"
    })
    if (!response.ok) {
        throw new Error("Error fetching Hotels")
    }
    return response.json()
}

export async function fetchMyHotelById(id: string): Promise<HotelType> {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${id}`, {
        credentials: "include"
    })

    if (!response.ok) {
        throw new Error("Error fetching Hotels")
    }
    return await response.json()
}



export async function updateMyHotel(hotelFormData: FormData) {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get('hotelId')}`, {
        method: "PUT",
        credentials: "include",
        body: hotelFormData
    })
    if (!response.ok) {
        throw new Error("Error updating hotel")
    }
    return response.json()
}

export type SearchParams = {
    destination?: string | undefined,
    checkIn?: string | undefined,
    checkOut?: string | undefined,
    adultCount?: string | undefined,
    childCount?: string | undefined,
    page?: string,
    facilities?: string[],
    type?: string[],
    stars?: string[],
    maxPrice?: string,
    sortOption?: string,
}

export const searchHotels = async (SearchParams: SearchParams): Promise<HotelSearchResponse> => {
    const queryParams = new URLSearchParams()
    queryParams.append("destination", SearchParams.destination || "")
    queryParams.append("checkIn", SearchParams.checkIn || "")
    queryParams.append("checkOut", SearchParams.checkOut || "")
    queryParams.append("adultCount", SearchParams.adultCount || "")
    queryParams.append("childCount", SearchParams.childCount || "")
    queryParams.append("page", SearchParams.page || "")
    queryParams.append("maxPrice", SearchParams.maxPrice || "")
    queryParams.append("sortOption", SearchParams.sortOption || "")

    SearchParams.type?.forEach((type) => queryParams.append("type", type))
    SearchParams.stars?.forEach((star) => queryParams.append("stars", star))
    SearchParams.facilities?.forEach((facility) => queryParams.append("facilities", facility))
    const response = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`)

    if (!response.ok) {
        throw new Error("Error searching hotels")
    }

    return response.json()

}

export async function viewHotelById(Id: string): Promise<HotelType> {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${Id}`)

    if (!response.ok) {
        throw new Error("Error fetching hotel")
    }
    return response.json()
}


export async function createpaymentIntent(hotelId: string, numberOfNights: number):Promise<paymentIntentResponse> {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ numberOfNights })
    })

    if (!response.ok) {
        throw new Error("Error creating payment intent")
    }

    return response.json()
}


export async function createRoomBooking(formData: BookingFormData): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(formData)
    })

    if (!response.ok) {
        throw new Error("Error booking room")
    }
    return response.json()
}


export async function fetchMyBookings(): Promise<HotelType[]> {
    const response = await fetch(`${API_BASE_URL}/api/myBookings/getHotels`, {
        credentials: "include"
    })
    if (!response.ok) {
        throw new Error("Error fetching Bookings")
    }
    return response.json()
}

export async function topHotels():Promise<HotelSearchResponse>{
    
    const response = await fetch(`${API_BASE_URL}/api/hotels/search?stars=5`)

    if (!response.ok) {
        throw new Error("Error searching hotels")
    }

    return response.json()
}

export type TopBookings = {
    hotels:HotelType[],
    topBooking:[
        _id:string,
        totalBooking:number
    ]
}

export async function topBookings():Promise<TopBookings>{
    
    const response = await fetch(`${API_BASE_URL}/api/hotels/topBookings`)

    if (!response.ok) {
        throw new Error("Error searching hotels")
    }

    return response.json()
}