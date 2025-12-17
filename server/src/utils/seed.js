//This file is use for one time only to store all 250 movies to database 
// To perform Crud opertion on it as admin  


import Movie from "./models.js";
import fetch from "node-fetch";

export const seed = async () => {
    try {
        // const res = await fetch("https://fast-cliffs-00649.herokuapp.com/api/v1/movies");
        // const movies = await res.json();

        // await Movie.insertMany(movies);
        // console.log("Imported Top 250 Movies");
        // console.log(movies)
        const url = 'https://imdb_api4.p.rapidapi.com/get_movies_by_cast_name';
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '1bca1f13edmshbe71afd26a3d742p193c5djsnfbff347cd00c',
                'x-rapidapi-host': 'imdb_api4.p.rapidapi.com'
            },
        })

        const movies = await res.json();
        // console.log(movies)
        const saveToDatabase = await Movie.insertMany(movies)
        console.log("data Saved to database")
    } catch (error) {
        console.log(error);
    }
};
