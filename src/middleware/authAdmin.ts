import { RequestHandler } from "express";
import Jwt  from "jsonwebtoken";

export const verifyTokenAdmin:RequestHandler = async(req, res, next)=>{
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw res.status(401).json({
                success: false,
                message: "No token provided or invalid format",
                statusCode: 401,
              });
        }

        const secret: any = process.env.tokenSecret

        const verifyToken:any = Jwt.verify(authHeader, secret)

        console.log(verifyToken);
        req.body.user = verifyToken

        if (verifyToken.role == "admin") {
            next()
        }
        
    } catch (error: any) {
        res.status(400).json({
            "message": error.message
        })
    }
}