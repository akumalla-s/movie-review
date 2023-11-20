import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { movieActions } from "../store/movieReducer";

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
    <div>
      <h3>{movieName}</h3>
      <p>Year of Release: {yearOfRelease}</p>
      {moviePhoto && (
        <img
          src={moviePhoto}
          alt={movieName}
          style={{ maxWidth: "100px", maxHeight: "150px" }}
        />
      )}
      <p>Rating: {rating}</p>
      <p>Review Comments:</p>
      <ul>
        {reviewComments.map((comment, index) => (
          <li key={index}>
            <strong>User:</strong> {comment.user}, <strong>Comment:</strong>{" "}
            {comment.comment}
          </li>
        ))}
      </ul>
    </div>
  );
}
