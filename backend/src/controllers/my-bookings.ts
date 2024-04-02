import { constants } from "buffer";
import { Request, Response } from "express";
import Hotel from "../models/hotels";
import { HotelType } from "../shared/types";
export async function myBookings(req: Request, res: Response) {
    try {
        const hotel = await Hotel.find({ bookings: { $elemMatch: { userId: req.userId } } })
        const result = hotel.map((hotel) => {
            const userBookings = hotel.bookings.filter((booking)=> booking.userId === req.userId)

            const bookingWithUser : HotelType ={
                ...hotel.toObject(),
                bookings: userBookings
            }
            return bookingWithUser;
        })

         res.status(200).json(result)
        

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}