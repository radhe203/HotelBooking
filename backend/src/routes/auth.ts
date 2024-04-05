import express from "express"
import { login, logout, validateToken } from "../controllers/auth"
import { check } from "express-validator"
import VerifyToken from "../utils/VerifyToken"

const router = express.Router()


router.post('/login',[
    check('email','Email is required').isEmail(),
    check('password','Password is required').isLength({min:6})
],login)

router.get("/validate-token",VerifyToken,validateToken)
router.post("/logout",logout)
export default router