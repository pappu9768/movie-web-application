import movieModel from "../models/movies.model.js";
import { ApiError } from "../utils/ApiError.js"
export const addMovies = async (req, res) => {

    try {

        const { title, year, director, cast, rating } = req.body;

        // Find max rank in DB
        const lastMovie = await movieModel.findOne().sort({ rank: -1 });
        // console.log(lastMovie)
        // If no movies exist, start with rank = 1
        const nextRank = lastMovie ? lastMovie.rank + 1 : 1;

        const newMovies = new movieModel({
            title,
            year,
            director,
            cast,
            rating,
            rank: nextRank
        })

        const saveMovies = await newMovies.save();

        return res.status(201).json({
            message: "new movie is added",
            success: true,
            saveMovies
        })
    } catch (error) {
        throw new ApiError(400)
    }



}

export const editMovies = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, year, director, cast, rating } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Movie Not Found",
        success: false
      });
    }

    const updatedMovie = await movieModel.findByIdAndUpdate(
      id,
      { title, year, director, cast, rating },
      { new: true, runValidators: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({
        message: "Movie not found",
        success: false
      });
    }

    return res.status(200).json({
      message: "Movie updated successfully",
      success: true,
      movie: updatedMovie
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const removeMovie = async(req,res) => {
    try {
        const {id} = req.params;

        if (!id) {
            return res.status(400).json({
                message: "Movie Not Found",
                success: false
            })
        }

        const remove = await movieModel.findByIdAndDelete({_id:id});

        return res.status(200).json({
            message:"movie deleted!!",
            success:true,
            remove
        })
    } catch (error) {
        throw new ApiError(400);
    }
}