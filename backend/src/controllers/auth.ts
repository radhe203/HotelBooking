import { Request,Response } from "express";
import { validationResult } from "express-validator"
import bcrypt from "bcryptjs";
import User from "../models/user";
import jwt from "jsonwebtoken";
export async function login(req:Request,res:Response){

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return  res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    try {

        let user = await User.findOne({
            email
        })

        if(!user){
            return res.status(400).json({
                message: "Invalid Credentials"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({
                message: "Invalid Credentials"
            })
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY as string, {
            expiresIn: "1d"
        })

        res.cookie('Hotel_Token',token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000
        })

        res.status(200).json({
            userId:user._id,
            message: "Login Successful"
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }

}