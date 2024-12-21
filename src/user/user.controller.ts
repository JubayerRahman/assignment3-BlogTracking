import { RequestHandler } from "express";
import  bcrypt from "bcrypt"
import { userService } from "./user.service";
import mongoose from "mongoose";

const createUser : RequestHandler = async(req, res)=>{
    try {
        const user = req.body
        const saltRounds = 10
        user.password = await bcrypt.hash(user.password, saltRounds)

        const result = await userService.createUser(user)
        const resultToShow = {
            _id: result._id,
            name: result.name,
            email: result.email
        }
        res.status(200).json({
                "success": true,
                "message": "User registered successfully",
                "statusCode": 201,
                "data": resultToShow
        })
    } catch (error: any) {
       res.status(400).json({
        "success": false,
        "message": "Validation error",
        "statusCode": 400,
        "error": error.message,
        "stack": "error stack"
      })
    }
}

const blockUser: RequestHandler = async(req, res)=>{
    try {
        const userRole = req.body.user.role
        const id = req.params?.userId
        const filter = {_id: new mongoose.Types.ObjectId(id)}
        const data = {isBlocked: 'true'}
        console.log(data);
        if (userRole == "admin") {
            const result = userService.blockUser(filter, data)
            res.status(200).json({
                "success": true,
                "message": "User blocked successfully ",
                "statusCode": 200
            })    
        
        }
        else{
            res.status(400).json({
                "success": false,
                "message": "You cannot block a user ",
                "statusCode": 400
            })
        }
    } catch (error: any) {
        res.status(400).json({
            "success": false,
            "message": error.message,
            "statusCode": 400
        })  
    }
}

export const userController = {
    createUser,
    blockUser
}