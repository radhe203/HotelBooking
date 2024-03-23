import express, { Request, Response } from "express"
import { uploadImages } from "../utils/uploadImage";
import Hotel, { HotelType } from "../models/hotels";
export async function AddHotel(req: Request, res: Response) {
    try {
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel: HotelType = req.body;
        // console.log(imageFiles)
        const imageUrls = await uploadImages(imageFiles)
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId
        const hotel = new Hotel(newHotel)
        await hotel.save()
        res.status(201).send(hotel)

    } catch (error) {
        console.log("Error creating hotel", error)
        res.status(500).json({ message: "Error creating hotel" })
    }
}