import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            userId: string
        }
    }
}

export default function VerifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies["Hotel_Token"]

    if (!token) return res.status(401).json({ message: "Unauthorized" })


    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY as string)
        req.userId = (decode as JwtPayload).userId
        next()
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" })
    }
}
