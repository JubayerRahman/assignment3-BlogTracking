import express from "express"
import { loginController } from "./login.controller"
const router = express.Router()

router.post("/auth/login", loginController.createToken)

export const loginRoutes = router