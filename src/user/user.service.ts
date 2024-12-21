import { users } from "./user.interface";
import { userModel } from "./user.Model";

const createUser = async(user:users)=>{
    const result = await userModel.create(user)
    return result
}

const blockUser = async(filter: any, data: any)=>{
    console.log(data);
    
    const result = await userModel.findByIdAndUpdate(filter, data, {new: true})
    return result
}

export const userService = {
    createUser,
    blockUser
}