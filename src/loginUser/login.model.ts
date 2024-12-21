import { model, Schema } from "mongoose";
import { Login } from "./login.interface";

const loginSchema = new Schema<Login>({
    email: {type: String, required: true},
    password: {type: String, required: true}
})

export const loginTokenModel = model<Login>("loginToken", loginSchema) 