import { Login } from "./login.interface";
import { loginTokenModel } from "./login.model";

const loginUser = async(logininfo: Login)=>{
    const result = await loginTokenModel.create(logininfo)
    return result
}

export const loginService = {
    loginUser
}