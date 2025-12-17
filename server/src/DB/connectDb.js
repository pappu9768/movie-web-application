import mongoose from "mongoose";

const connectDB = async() => {
    try {
        const mongoUri = process.env.MONGO_URI
        const con = await mongoose.connect(mongoUri)
        console.log(`Database Connected successfully ${con.connection.host}`)
    } catch (error) {
        console.log(error)
    }
}

export default connectDB;