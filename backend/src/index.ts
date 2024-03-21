import express, { Request, Response } from "express"
import "dotenv/config"
import cors from "cors"
import mongoose from "mongoose"
import userRoutes from "./routes/users"
import authRoutes from "./routes/auth"
import cookieParser from "cookie-parser"
import path from "path"
const app = express()
app.use(cookieParser())
mongoose.connect(process.env.MONGO_CONNECTION_STRING as string)
    .then(() => {
        console.log("MongoDb connected")
    })
    .catch((error) => {
        console.log(error)
    })

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
))

app.use(express.static(path.join(__dirname, '../../frontend/dist')))

app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)

app.listen(3000, () => {
    console.log("server is running on port 3000")
})
