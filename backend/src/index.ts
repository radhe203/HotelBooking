import express, { Request, Response } from "express"
import "dotenv/config"
import cors from "cors"
import mongoose from "mongoose"
import userRoutes from "./routes/users"
const app = express()

mongoose.connect(process.env.MONGO_CONNECTION_STRING as string)
    .then(() => {
        console.log("MongoDb connected")
    })
    .catch((error) => {
        console.log(error)
    })

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api/users',userRoutes)


app.listen(3000, () => {
    console.log("server is running on port 3000")
})
