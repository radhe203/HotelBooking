import { Request, Response } from "express"
import cloudinary from "cloudinary"
import Hotel, { HotelType } from "../models/hotels";
export async function AddHotel(req: Request, res: Response) {
    try {
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel: HotelType = req.body;
        const uploadProise = imageFiles.map(async (image) => {
            const b64 = Buffer.from(image.buffer).toString('base64');
            let dataURI = "data:" + image.mimetype + ";base64," + b64
            const res = await cloudinary.v2.uploader.upload(dataURI)
            return res.secure_url
        })

        const imageUrls = await Promise.all(uploadProise)
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