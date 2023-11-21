// DisplayMovie.js
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { movieActions } from "../store/movieReducer";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "../css/DisplayMovie.css";
import { Rating } from "@mui/material";

export default function DisplayMovie({
  movieName,
  yearOfRelease,
  moviePhoto,
  rating,
  reviewComments,
  totalRatingValue,
  numberOfUsersGivenRating,
  movieId,
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      movieActions.addMovie({
        movieName,
        yearOfRelease,
        moviePhoto,
        rating,
        reviewComments,
        totalRatingValue,
        numberOfUsersGivenRating,
        movieId,
      })
    );
  }, []);

  return (
    <div className="movie-component">
      <Link to={`/review/${movieId}`}>
        <h3>{movieName}</h3>
      </Link>
      <div className="movie-details">
        <p>Year of Release: {yearOfRelease}</p>
        <Rating name="half-rating-read" value={parseFloat(rating)} precision={0.5} readOnly />
      </div>
      {moviePhoto && <img src={moviePhoto} alt={movieName} />}
    </div>
  );
}
