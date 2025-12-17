import registerModel from '../models/user.register.js'
import { ApiError } from '../utils/ApiError.js'
// import { ApiResponse } from '../utils/ApiResponse.js'
import { AsyncHandler } from '../utils/AsyncHandler.js'
import bcrypt from 'bcrypt'

export const register = AsyncHandler(async (req, res) => {
        
            const { name, email, username, password } = req.body

    //email or username should not exist

            const users = await registerModel.findOne({
                $or: [{ email }, { username }]
            })

            if (users) {
                throw new ApiError(500, "User all ready exist with same username or email!")
            }

            if(!name|| !email|| !username|| !password){
                throw new ApiError(400, "All fields are required")
            }



            const hashPassword = await bcrypt.hash(password, 10);



            const newUser = new registerModel({
                name,
                email,
                username,
                password: hashPassword,

            })

            const saveUser = await newUser.save();

            return res.status(201).json({
                message:"Registered successfully!",
                success:true,
                saveUser
            })
       
    }
)