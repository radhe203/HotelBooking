import { Request, Response } from "express";
import Hotel from "../models/hotels";
import { BookingType, HotelSearchResponse } from "../shared/types";
import { validationResult } from "express-validator";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_KEY as string)

export async function paymentIntent(req: Request, res: Response) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const { numberOfNights } = req.body
    const hotelId = req.params.hotelId

    try {
        const hotel = await Hotel.findById(hotelId)
        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" })
        }
        const totalCost = numberOfNights * hotel.pricePerNight

        const Intent = await stripe.paymentIntents.create({
            amount: totalCost,
            currency: "INR",
            metadata: {
                hotelId: hotelId,
                userId: req.userId
            }
        })

        if (!Intent.client_secret) {
            return res.status(400).json({ message: "Error creating payment Intent" })
        }

        const response = {
            paymentIntentId: Intent.id,
            clientSecret: Intent.client_secret.toString(),
            totalCost: totalCost
        }
        res.status(200).json(response)
    } catch (error) {
        console.log(error,"error")
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function viewHotel(req: Request, res: Response) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    try {
        const Id = req.params.Id.toString();
        const hotel = await Hotel.findById(Id)

        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" })
        }
        res.status(200).json(hotel)
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}


export async function search(req: Request, res: Response) {
    const query = constructSearchQuery(req.query)
    let sortOptions = {};
    switch (req.query.sortOption) {
        case "starRating":
            sortOptions = { starRating: -1 };
            break;
        case "pricePerNightAsc":
            sortOptions = { pricePerNight: 1 };
            break;
        case "pricePerNightDesc":
            sortOptions = { pricePerNight: -1 };
            break;
    }

    try {
        const pageSize = 5
        const pageNumber = parseInt(
            req.query.page ? req.query.page.toString() : "1"
        )

        const hotels = await Hotel.find(query)
            .sort(sortOptions)
            .skip(pageSize * (pageNumber - 1))
            .limit(pageSize)

        const total = await Hotel.countDocuments(query)

        const response: HotelSearchResponse = {
            data: hotels,
            pagination: {
                total,
                pages: Math.ceil(total / pageSize),
                page: pageNumber
            }
        }

        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
        console.log(error)
    }
}



function constructSearchQuery(queryParams: any) {
    let constructedQuery: any = {}
    if (queryParams.destination) {
        constructedQuery.$or = [
            { city: new RegExp(queryParams.destination, "i") },
            { country: new RegExp(queryParams.destination, "i") },
        ]
    }

    if (queryParams.adultCount) {
        constructedQuery.adultCount = {
            $gte: parseInt(queryParams.adultCount)
        }
    }

    if (queryParams.childCount) {
        constructedQuery.childCount = {
            $gte: parseInt(queryParams.childCount)
        }
    }

    if (queryParams.facilities) {
        constructedQuery.facilities = {
            $all: Array.isArray(queryParams.facilities) ? queryParams.facilities : [queryParams.facilities]
        }
    }

    if (queryParams.type) {
        constructedQuery.type = {
            $in: Array.isArray(queryParams.types) ? queryParams.type : [queryParams.type]
        }
    }


    if (queryParams.stars) {
        const starRatings = Array.isArray(queryParams.stars) ? queryParams.stars.map((star: any) => parseInt(star)) : parseInt(queryParams.stars)
        constructedQuery.starRating = { $in: starRatings }

    }

    if (queryParams.maxPrice) {
        constructedQuery.pricePerNight = {
            $lte: parseInt(queryParams.maxPrice)
        }
    }


    return constructedQuery
}


export async function BookHotel(req: Request, res: Response) {
    try {
        console.log(req.body)

        // const IntentId = req.body.paymentIntentId

        // const paymentIntent = await stripe.paymentIntents.retrieve(
        //     IntentId as string
        // )

        // if (!paymentIntent) {
        //     return res.status(400).json({ message: "something went wrong" })
        // }

        // if (paymentIntent.metadata.hotelId !== req.params.hotelId || paymentIntent.metadata.userId !== req.userId) {
        //     return res.status(400).json({ message: "something went wrong" })
        // }
        // if (paymentIntent.status !== "succeeded") {
        //     return res.status(400).json({ message: `payment failure , status:${paymentIntent.status}` })
        // }

        const newBooking: BookingType = {
            userId: req.userId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            adultCount: req.body.adultCount,
            childCount: req.body.childCount,
            checkIn: req.body.checkIn,
            checkOut: req.body.checkOut,
            totalCost: req.body.totalCost,
        }

        const hotel = await Hotel.findOneAndUpdate({ _id: req.params.hotelId }, { $push: { bookings: newBooking } })

        if (!hotel) {
            return res.status(400).json({ message: "hotel Not Found" })
        }
        hotel.save()
        res.status(200).json({ message: "Hotel booked Successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
        return;
    }
}