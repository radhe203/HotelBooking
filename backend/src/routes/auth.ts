import express from "express"
import { login } from "../controllers/auth"
import { check } from "express-validator"

const router = express.Router()

router.post('/login',[
    check('email','Email is required').isEmail(),
    check('password','Password is required').isLength({min:6})
],login)

export default router