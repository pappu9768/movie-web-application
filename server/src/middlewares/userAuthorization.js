import Jwt from 'jsonwebtoken';
import registerModel from '../models/user.register.js';

export const userAuthorization = async(req,res,next) => {
    try {
        const checkToken = req.headers['authorization']

        if(!checkToken){
            return res.status(401).json({
                message:"Sry you are unauthrorized you have to login first"
            })
        }

        const authorizeToken = Jwt.verify(checkToken,process.env.SECRET_KEY);
        // console.log(authorizeToken._id);

        const getRole = await registerModel.findById(authorizeToken._id).select("role");
        // console.log(getRole.role);
        req.user = getRole.role;
        // const role = getRole.role


        next()



    } catch (error) {
        console.log(error)
    }
}