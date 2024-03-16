import express, { Request, Response } from "express"
import "dotenv/config"
import cors from "cors"
import mongoose from "mongoose"

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



app.get('/api/test', async (req: Request, res: Response) => {
    res.json({ message: "express testing" })
})


app.listen(3000, () => {
    console.log("server is running on port 3000")
})
