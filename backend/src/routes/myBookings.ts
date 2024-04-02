import express, { Router } from "express";
import VerifyToken from "../utils/VerifyToken";
import { myBookings } from "../controllers/my-bookings";
const router = express.Router();

router.get("/getHotels",VerifyToken,myBookings)

export default router



