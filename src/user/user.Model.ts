import { model, Schema } from "mongoose";
import { users } from "./user.interface";

const userSchema =new Schema<users>({
    name:{type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    isBlocked: {type: Boolean, default: false},
    role: {type: String, enum:["admin", "user"], default: "user"}
},{
    timestamps: true
})

export const userModel = model<users>('users', userSchema)