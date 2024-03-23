import express, { Request, Response } from "express"
import { uploadImages } from "../utils/uploadImage";
import Hotel from "../models/hotels";
import { HotelType } from "../shared/types";
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

export async function AllHotel(req: Request, res: Response){
    try {
        const userId =req.userId
        const hotels = await Hotel.find({userId}).sort({lastUpdated:-1})
        res.status(200).send(hotels)
    } catch (error) {
        res.status(400).send({message:error})
        console.log(error)
    }
}