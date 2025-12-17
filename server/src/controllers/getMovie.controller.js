import movieModel from '../models/movies.model.js'
import { ApiError } from '../utils/ApiError.js';

export const getSpecificMovies = async (req, res) => {
    try {

        const { id } = req.params

        const get = await movieModel.findById({ _id: id });


        return res.status(200).json({
            message: "here all your movies",
            success: true,
            get
        })
    } catch (error) {
        throw new ApiError(400);
    }
}



export const getSortOptions = (query) => {
  const { sortBy, order } = query;

  // 🔥 DEFAULT: sort by rank
  if (!sortBy) {
    return { rank: 1 };
  }

  const allowedFields = ["title", "rating", "year", "duration", "rank"];

  if (!allowedFields.includes(sortBy)) {
    return { rank: 1 };
  }

  return {
    [sortBy]: order === "asc" ? 1 : -1,
  };
};


export const getMoviesInPage = async (req, res) => {
    try {
        const { page = 1, search = "" } = req.query;
        const limit = 10;
        const skip = (page - 1) * limit;

         const sortOptions = getSortOptions(req.query);
        const query = {
            $or: [
                { title: { $regex: search, $options: "i" } },
                { cast: { $regex: search, $options: "i" } },
                { director: { $regex: search, $options: "i" } },
                { year: isNaN(search) ? undefined : Number(search) },
            ].filter(Boolean),
        };

        const movies = await movieModel
            .find(search ? query : {})
            .sort(sortOptions)
            .skip(skip)
            .limit(limit);

        const total = await movieModel.countDocuments(search ? query : {});

        res.json({
            success: true,
            movies,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        throw new ApiError(400);
    }



}

