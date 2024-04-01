import express from "express";
import { search, viewHotel } from "../controllers/hotels";
import { param } from "express-validator";
const router = express.Router();


router.get('/search', search)
router.get('/:Id',
    [param("Id").notEmpty().withMessage("Id is Required")]
    , viewHotel) // if we declare this route first then it will not work because of the id. 

export default router;