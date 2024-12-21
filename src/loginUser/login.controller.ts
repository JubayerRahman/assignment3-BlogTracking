import { RequestHandler } from "express";
import { userModel } from "../user/user.Model";
import bcrypt from "bcrypt"
import Jwt  from "jsonwebtoken";
import { loginService } from "./login.service";

const createToken : RequestHandler = async(req, res)=>{
   try {
    const {email, password} = req.body
    const user: any = await userModel.find({email})
    if (!user) {
        res.status(401).json({
                "success": false,
                "message": "Invalid credentials",
                "statusCode": 401,
                "error": "details" ,
                "stack": "error stack"
        })
    }
    const isPassword = await bcrypt.compare(password, user[0].password)
    if (!isPassword) {
        res.status(401).json({
            "success": false,
            "message": "Invalid credentials",
            "statusCode": 401,
            "error": "details" ,
            "stack": "error stack"
    })
    }

    const secret: any = process.env.tokenSecret
    const logininfo: any = Jwt.sign(
        {id: user[0]._id, email: user[0].email, role: user[0].role},
        secret,
        { expiresIn: "10d" }
    )

    res.status(200).json({
        "success": true,
        "message": "Log in successfully",
        "statusCode": 201,
        "token": logininfo,
})
   } catch (error) {
    
   }
}

export const loginController = {
    createToken
}