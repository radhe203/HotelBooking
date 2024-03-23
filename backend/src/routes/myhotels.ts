import express, { Request, Response } from "express"
import { AddHotel, AllHotel } from "../controllers/myhotels"
import multer from "multer"
import VerifyToken from "../utils/VerifyToken"
import { body } from "express-validator"
const router = express.Router()

const storage = multer.memoryStorage()

const upload = multer({
    storage: storage,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB
    },
  });
//api/my-hotels
router.post('/', VerifyToken, [
    body('name').notEmpty().withMessage("Name is required"),
    body('description').notEmpty().withMessage("Description is required"),
    body('city').notEmpty().withMessage("City is required"),
    body('country').notEmpty().withMessage("Country is required"),
    body("pricePerNight").notEmpty().isNumeric().withMessage("Price per night is required and must be a number"),
    body("facalities").notEmpty().isArray().withMessage("Facalities is required and must be an array"),
    body("type").notEmpty().withMessage("Hotel type is required"),
], upload.array("imageFiles", 6), AddHotel)
router.get('/',VerifyToken,AllHotel)

export default router