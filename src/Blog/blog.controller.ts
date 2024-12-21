import { RequestHandler } from "express";
import { blogService } from "./blog.service";
import mongoose from "mongoose";
import { BlogModel } from "./Blog.model";

const createBlog: RequestHandler = async(req, res)=>{
    try {
        const Blog = req.body
        const BlogContent = {
              title: Blog.title,
              content: Blog.content,
              author: Blog.user.id
        }
        console.log(Blog);
        
        const result = await blogService.blogUser(BlogContent)
        res.status(200).json({
            "success": true,
            "message": "Blog created successfully",
            "statusCode": 201,
            "data": {
              "_id": result._id,
              "title": result.title,
              "content": result.content,
              "author": req.body.user.id
            }
          })
    } catch (error: any) {
        res.status(200).json({
            "success": true,
            "message": "Blog created successfully",
            "statusCode": 201,
            "data":error.message
          }) 
    }

  }

  const updateBlog: RequestHandler = async(req, res)=>{
    try {
      const id = req.params?.id
      const userId = req.body.user.id
      const filter = {_id: new mongoose.Types.ObjectId(id)}
      const findBlog = await BlogModel.find(filter)
      const authorID = findBlog[0].author
      console.log(authorID);

      if (userId !== authorID) {
        res.status(400).json({
          "success": false,
          "message": "You cannot change this blog",
          "statusCode": 400,
        })
      }
      
      const date = req.body
      const result= await blogService.updateBlog(filter, date)
      res.status(200).json({
        "success": true,
        "message": "Blog updated",
        "statusCode": 200,
        "data": result
      })
    } catch (error: any) {
      res.status(400).json({
        "success": false,
        "message": error.message,
        "statusCode": 400,
      })
    }
  }

  const DeleteBlog: RequestHandler =  async(req, res)=>{
    try {
      const id = req.params?.id
      const userId = req.body.user.id
      const userRole = req.body.user.role
      const filter = {_id: new mongoose.Types.ObjectId(id)}
      const findBlog: any = await BlogModel.findOne(filter)
      const authorID = findBlog.author
      
      if (userId !== authorID && userRole == "user") {
        res.status(400).json({
          "success": false,
          "message": "You cannot delete this blog",
          "statusCode": 400,
        })
      }
      if (userRole == "admin") {
        const result= await blogService.DeleteBlog(filter)
        res.status(200).json({
          "success": true,
          "message": "blog Deleted",
          "statusCode": 200,
          "data": result
        })
      }
      
    const result= await blogService.DeleteBlog(filter)
    res.status(200).json({
      "success": true,
      "message": "blog Deleted",
      "statusCode": 200,
      "data": result
    })

    } catch (error:any) {
      res.status(400).json({
        "success": false,
        "message": error.message,
        "statusCode": 400,
      })
    }
  }

  const AllBlogs: RequestHandler = async(req, res)=>{

    const { search, sortBy = "createdAt", sortOrder = "desc", filter } = req.query

    const query: any = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } }, 
        { content: { $regex: search, $options: "i" } }, 
      ];
    }

    if (filter) {
      query.author = filter;
    }

    const sort: any = {};
    sort[sortBy as string] = sortOrder === "asc" ? 1 : -1;

    const result = await blogService.AllBlogs(query, sort)
    res.status(200).json(
      {
        "success": true,
        "message": "Blogs fetched successfully",
        "statusCode": 200,
        "data": result
      
    })
  }

export const BlogController = {
  createBlog,
  updateBlog,
  DeleteBlog,
  AllBlogs,
}