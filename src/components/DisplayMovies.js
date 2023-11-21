import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DisplayMovie from './DisplayMovie';

export default function DisplayMovies() {
  
  const [movies, setMovies] = useState([]);

  const getAllMoviesUrl = "https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/movies";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTkzMWM4NjY5ZjJjZjM0N2YyNmMyZCIsInVzZXJuYW1lIjoiMDAyNzk4MTY2UyIsImlhdCI6MTcwMDM0NDI2OCwiZXhwIjoxNzAxNjQwMjY4fQ.3YuL_w8ovVtTfS0RvFuPSf-f1DbXF4jL16hGqmJyJIo";
  const config = { headers: { Authorization: `${token}` } };

  const getAllMovies = async ()=>{
    try {
      const response = await axios.get(getAllMoviesUrl, config);
      setMovies(response.data.data)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    getAllMovies();
  },[]);

  return (
    <div>
      {movies.length > 0 ? (
        movies.map((movie) => (
          <DisplayMovie
            key={movie._id}
            movieName={movie.movieName}
            yearOfRelease={movie.yearOfRelease}
            moviePhoto={movie.moviePhoto}
            rating={movie.rating}
            reviewComments={movie.reviewComments}
            totalRatingValue={movie.totalRatingValue}
            numberOfUsersGivenRating={movie.numberOfUsersGivenRating}
            movieId={movie._id}
          />
        ))
      ) : (
        <p>No Movies Available</p>
      )}
    </div>
  )
}
