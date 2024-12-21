import { model, Schema } from "mongoose";
import { Blog } from "./Blog.interface";

const blogSchema = new Schema<Blog>({
    title:{type:String, required: true},
    content:{type:String, required:true},
    author:{type:String}
},{
    timestamps: true
})
export const BlogModel = model<Blog>("Blog", blogSchema)