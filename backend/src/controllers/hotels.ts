import { Request, Response } from "express";
import Hotel from "../models/hotels";
import { HotelSearchResponse } from "../shared/types";
import { validationResult } from "express-validator";

export async function viewHotel(req: Request, res: Response) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    try {
        const Id = req.params.Id.toString();
        console.log(Id)
        const hotel = await Hotel.findById(Id)
    
        console.log(hotel)
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
    console.log(req.query, "Query")
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

    console.log(constructedQuery, "quering")

    return constructedQuery
}
