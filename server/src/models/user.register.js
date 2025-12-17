import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true

    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true

    },
    role:{
        type:String,
        default:1
    }

},
{
    timestamps:true
})

const registerModel = new mongoose.model('user',registerSchema)

export default registerModel