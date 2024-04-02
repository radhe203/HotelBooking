import { Request, Response } from "express"
import User from "../models/user"
import jwt from "jsonwebtoken"
import { validationResult } from "express-validator"
export const register = async (req: Request, res: Response) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: errors.array()
        })
    }
    try {
        let user = await User.findOne({
            email: req.body.email
        })
        if (user) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        user = new User(req.body)
        await user.save()

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY as string, {
            expiresIn: "1d"
        })

        res.cookie("Hotel_Token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000
        })

        return res.status(200).send({message:"user registered ok"})

    } catch (error) {
        res.status(500).json({
            message: "Something Went wrong"
        })
    }
}


export async function me(req: Request, res: Response) {
    try {
        const user = await User.findById(req.userId).select("-password")
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        return res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            message: "Something Went wrong"
        })
    }
}