
import { RegisterFormData } from "./pages/Register";
import { SigninFormData } from "./pages/Signin";
import { HotelType } from "../../backend/src/shared/types";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

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
    if(!response.ok){
        throw new Error("Error fetching Hotels")
    }
    return response.json()
} 

export async function fetchMyHotelById(id: string): Promise<HotelType> {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${id}`, {
        credentials: "include"
    })
    if(!response.ok){
        throw new Error("Error fetching Hotels")
    }
    return response.json()
}



export async function updateMyHotel(hotelFormData: FormData) {
    console.log(hotelFormData)
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get('hotelId')}`, {
        method: "PUT",
        credentials: "include",
        body: hotelFormData
    })
    if(!response.ok){
        throw new Error("Error updating hotel")
    }
    return response.json()
}