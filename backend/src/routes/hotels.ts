import express from "express";
import { BookHotel, paymentIntent, search, viewHotel } from "../controllers/hotels";
import { param } from "express-validator";
const router = express.Router();
import Stripe from "stripe";
import VerifyToken from "../utils/VerifyToken";


router.get('/search', search)
router.get('/:Id',
    [param("Id").notEmpty().withMessage("Id is Required")]
    , viewHotel) // if we declare this route first then it will not work because of the id. 

router.post("/:hotelId/bookings/payment-intent", VerifyToken, [param("hotelId").notEmpty().withMessage("hotelId is Required")], paymentIntent)

router.post("/:hotelId/bookings", VerifyToken, VerifyToken, [param("hotelId").notEmpty().withMessage("hotelId is Required")], BookHotel)

export default router;