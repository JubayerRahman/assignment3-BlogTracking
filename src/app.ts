import express, { Request, Response } from "express"
import cors from "cors"
import { userRouters } from "./user/user.router"
import { loginRoutes } from "./loginUser/login.router"
import dotenv from "dotenv"
import { verifyToken } from "./middleware/authUser"
import { BlogRouter } from "./Blog/Blog.router"

const app = express()
dotenv.config()

app.use(cors())
app.use(express.json())
app.use('/api/', userRouters)
app.use('/api/', loginRoutes)
app.use('/api/', BlogRouter)

app.get('/', async(req: Request,res: Response)=>{
    res.status(200).json({
        success:"true",
        message: "Assignment blog 3" 
    })
})

app.get("/testToken", verifyToken, (req, res)=>{
    res.json({
        "data": req.body
    })
})

export default app