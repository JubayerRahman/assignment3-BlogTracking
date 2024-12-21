import express from "express"
import { verifyToken } from "../middleware/authUser"
import { BlogController } from "./blog.controller"
import { verifyTokenAdmin } from "../middleware/authAdmin"
const router = express.Router()

router.post("/blogs", verifyToken, BlogController.createBlog)
router.patch("/blogs/:id", verifyToken, BlogController.updateBlog)
router.delete("/blogs/:id", verifyToken, BlogController.DeleteBlog)
router.delete("/admin/blogs/:id", verifyTokenAdmin,  BlogController.DeleteBlog)
router.get("/blogs", BlogController.AllBlogs)

export const BlogRouter = router 