
import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    rank:Number,
    title: String,
    year:Number,
    director:String,
    cast:String,
    rating:Number
}, { timestamps: true });

const movieModel = mongoose.model("Movie", movieSchema);


export default movieModel;