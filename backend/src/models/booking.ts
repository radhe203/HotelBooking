import mongoose from "mongoose";
import { BookingType } from "../shared/types";


const bookingSchema = new mongoose.Schema<BookingType>({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true},
    adultCount:{type:Number,required:true},
    childCount:{type:Number,required:true},
    checkIn:{type:Date,required:true},
    checkOut:{type:Date,required:true},
    totalCost:{type:Number,required:true},
})