import { Blog } from "./Blog.interface";
import { BlogModel } from "./Blog.model";

const blogUser =  async(Blog: Blog)=>{
    const result = await BlogModel.create(Blog)
    return result
}

const updateBlog = async(filter: any, data: any)=>{
    const updatedBlog = data
    const result = await BlogModel.findByIdAndUpdate(filter, updatedBlog, {new:true})
    return result
}

const DeleteBlog = async (filter: any)=>{
    console.log("hii");
    
    const result = await BlogModel.deleteOne(filter)
    return result
}

const AllBlogs = async(query: any, sort:any)=>{
    const result = await BlogModel.find(query).sort(sort)
    return result
}

export const blogService = {
    blogUser,
    updateBlog,
    DeleteBlog,
    AllBlogs
}