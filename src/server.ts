import app from "./app"
import mongoose from "mongoose";

const ConnectiongDB = async()=>{
    const localUri = "mongodb://localhost:27017/blogAssignment"
    await mongoose.connect(process.env.uri as string);
    console.log("DB is connected"); 
}

ConnectiongDB()

app.listen(5000,()=> console.log("Server is running"))