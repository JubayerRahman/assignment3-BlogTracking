import express from "express"
import { userController } from "./user.controller";
import { verifyToken } from "../middleware/authUser";
import { verifyTokenAdmin } from "../middleware/authAdmin";
const router = express.Router()

router.post("/auth/register", userController.createUser)
router.patch("/admin/users/:userId/block", verifyTokenAdmin,  userController.blockUser)

export const userRouters = router