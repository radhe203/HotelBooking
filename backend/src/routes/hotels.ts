import express from "express";
import { search } from "../controllers/hotels";
const router = express.Router();


router.get('/search',search)

export default router;