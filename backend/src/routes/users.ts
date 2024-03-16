import express from "express"
import { register } from "../controllers/users"
import { check } from "express-validator"
const router = express.Router()

router.post('/register', [
    check('firstname', "Firstname is required").isString(),
    check('lastname', "Lasttname is required").isString(),
    check('email', "Email is required").isEmail(),
    check('password', "password with 6 characters or more required").isLength({ min: 6 })
], register)

export default router
