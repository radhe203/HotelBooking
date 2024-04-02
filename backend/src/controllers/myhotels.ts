import express, { NextFunction, Request, Response } from "express"
import { uploadImages } from "../utils/uploadImage";
import Hotel from "../models/hotels";
import { HotelType } from "../shared/types";
export async function AddHotel(req: Request, res: Response) {
    try {
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel: HotelType = req.body;
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

export async function AllHotel(req: Request, res: Response) {
    try {
        const userId = req.userId
        const hotels = await Hotel.find({ userId }).sort({ lastUpdated: -1 })
        res.status(200).send(hotels)
    } catch (error) {
        res.status(400).send({ message: error })
        console.log(error)
    }
}


export async function getHotel(req: Request, res: Response) {
    try {
        const id = req.params.Id.toString()
        const hotel = await Hotel.findOne({
            _id: id,
            userId: req.userId,
        })
        if (!hotel) {
            return res.status(404).send({ message: "Hotel not found" })
        }
        res.status(200).json(hotel)
    } catch (error) {
        res.status(500).send({ message: "Error getting hotel" })
    }
}

export async function updateHotel(req: Request, res: Response, next: NextFunction) {
    try {
        const hotelId = req.params.hotelId.toString()
        const hotel = await Hotel.findOne({
            _id: hotelId,
            userId: req.userId,
        })

        if (!hotel) {
            return res.status(404).send({ message: "Hotel not found" })
        }

        const files = req.files as Express.Multer.File[];
        const newUrls = files ? await uploadImages(files) : []
        const preUrls = req.body.imageUrls ? req.body.imageUrls : []
        const imageUrls = preUrls.concat(newUrls)
        const updatedHotel = await Hotel.findOneAndUpdate(
            { _id: hotelId, userId: req.userId },
            {
                $set: {
                    name:req.body.name,
                    city:req.body.city,
                    country:req.body.country,
                    description:req.body.description,
                    type:req.body.type,
                    adultCount:req.body.adultCount,
                    childCount:req.body.childCount,
                    facilities:req.body.facilities,
                    pricePerNight:req.body.pricePerNight,
                    starRating:req.body.starRating,
                    lastUpdated: new Date(),
                    imageUrls
                }
            },
            { new: true }
        )
        res.status(200).json(updatedHotel)
    } catch (error) {
        res.status(500).send({ message: "Error updating hotel" })
    }
}