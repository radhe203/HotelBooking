import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import { userType } from "../shared/types"


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required: true,

    },
    firstname: {
        type: String,
        required: true,

    },
    lastname: {
        type: String,
        required: true,
    }
})


userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})
    

const User = mongoose.model<userType>("User", userSchema)   

export default User;


