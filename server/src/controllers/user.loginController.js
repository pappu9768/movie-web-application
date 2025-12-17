import registerModel from "../models/user.register.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; 

export const login = AsyncHandler(async (req, res) => {
    const { name,email, password } = req.body;

    if(!email || !password){
        throw new ApiError(400,"All fields are required")
    }

    //email should  exist
    const user = await registerModel.findOne({ email });

    if(!user){
        throw new ApiError(401,"Email not exist")
    }


    //for password
    const checkPassword = await bcrypt.compare(password,user.password);

    if(!checkPassword){
        throw new ApiError(401,"Invalid Password")
    }

    const createToken = jwt.sign({_id:user._id,name:user.name},process.env.SECRET_KEY,{expiresIn:'2h'})

    return res.status(200).json({
        message:"Login Successfully!",
        success:true,
        createToken
    })
}

)