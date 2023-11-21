import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Rating } from "@mui/material";
import "../css/MovieReview.css";

export default function MovieReview() {
  const username = useSelector((state) => state.auth.username);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const { movieId } = useParams();
  let navigate = useNavigate();

  const [movie, setMovie] = useState({
    movieName: "",
    yearOfRelease: "",
    moviePhoto: "",
    rating: "",
    reviewComments: [],
    totalRatingValue: 0,
    numberOfUsersGivenRating: 0,
    _id: "",
  });

  const [comment, setComment] = useState("");
  const [userRating, setUserRating] = useState("");
  const [showComments, setShowComments] = useState(false);

  const findMovieUrl = `https://smooth-comfort-405104.uc.r.appspot.com/document/findOne/movies/${movieId}`;
  const updateMovieUrl = `https://smooth-comfort-405104.uc.r.appspot.com/document/updateOne/movies/${movieId}`;
  const deleteMovieUrl = `https://smooth-comfort-405104.uc.r.appspot.com/document/deleteOne/movies/${movieId}`;
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTkzMWM4NjY5ZjJjZjM0N2YyNmMyZCIsInVzZXJuYW1lIjoiMDAyNzk4MTY2UyIsImlhdCI6MTcwMDM0NDI2OCwiZXhwIjoxNzAxNjQwMjY4fQ.3YuL_w8ovVtTfS0RvFuPSf-f1DbXF4jL16hGqmJyJIo";
  const config = { headers: { Authorization: `${token}` } };

  const getMovieData = async () => {
    try {
      const response = await axios.get(findMovieUrl, config);
      setMovie(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddComment = async () => {
    try {
      const updatedMovie = { ...movie, rating: userRating };

      const newCommentData = {
        user: username || Date.now().toString(),
        comment: comment,
        Rating: userRating,
      };

      updatedMovie.reviewComments.push(newCommentData);

      await axios.put(updateMovieUrl, updatedMovie, config);
      setComment("");
      await getMovieData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async (index) => {
    try {
      const updatedMovie = { ...movie };
      updatedMovie.reviewComments.splice(index, 1);

      await axios.put(updateMovieUrl, updatedMovie, config);
      await getMovieData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateComment = async (index) => {
    try {
      setComment(movie.reviewComments[index].comment);
      const updatedMovie = { ...movie };
      updatedMovie.reviewComments[index].comment = comment;
      await axios.put(updateMovieUrl, updatedMovie, config);
      await getMovieData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteMovie = async () => {
    try {
      await axios.delete(deleteMovieUrl, config);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovieData();
  }, []);

  function handleCommentChange(e) {
    setComment(e.target.value);
  }

  return (
    <div className="movie-review-container">
      {movie ? (
        <>
          <div className="back-delete-button">
            <div className="back-button">
              <button onClick={() => navigate("/")}>&larr; Go back</button>
            </div>
            <div className="delete-movie-button">
              {isAdmin && (
                <button onClick={handleDeleteMovie}>Delete Movie</button>
              )}
            </div>
          </div>

          <h2 className="movie-name">{movie.movieName}</h2>
          <div className="movie-details">
            <div className="movie-info">
              <div>
                <label className="movie-release">Year Of Release: </label>
                {movie.yearOfRelease}
              </div>
              <div>
                <label className="movie-avg-rating">Avg Rating: </label>
                {isNaN(parseFloat(movie.rating))
                  ? 0
                  : parseFloat(movie.rating).toFixed(1)}
              </div>
            </div>
            <img
              className="movie-image"
              src={movie.moviePhoto}
              alt={movie.movieName}
            />
          </div>

          <div className="add-review">
            <h3>Add Your Review</h3>
            <div className="add-review-title">
              <label>Comment:</label>
              <input
                type="text"
                value={comment}
                onChange={handleCommentChange}
              />
            </div>
            <div>
              <label className="add-review-reivewtitle">Review:</label>
              <Rating
                name="half-rating"
                defaultValue={2.5}
                precision={0.5}
                onChange={(event, newValue) => {
                  if (newValue > 0) {
                    const newNumberOfUsersGivenRating =
                      movie.numberOfUsersGivenRating + 1;
                    const newTotalRatingValue =
                      movie.totalRatingValue + newValue;

                    const newRatingValue =
                      newTotalRatingValue / newNumberOfUsersGivenRating;

                    setMovie({
                      ...movie,
                      numberOfUsersGivenRating: newNumberOfUsersGivenRating,
                      totalRatingValue: newTotalRatingValue,
                    });
                    setUserRating(newRatingValue.toString());
                  }
                }}
              />
            </div>
            <button onClick={handleAddComment}>Add Your Review</button>
          </div>
          <h3
            className="comments-toggle"
            onClick={() => setShowComments(!showComments)}
          >
            {showComments ? "Hide Comments" : "Show Comments"}
          </h3>
          {showComments && (
            <ul
              className={
                showComments ? "comments-list" : "comments-list hidden"
              }
            >
              {movie.reviewComments.map(
                (comment, index) =>
                  comment.comment.trim() !== "" && (
                    <li key={index}>
                      <strong>User:</strong> {comment.user},{" "}
                      <strong>Comment:</strong> {comment.comment}{" "}
                      {((username && username === comment.user) || isAdmin) && (
                        <>
                          <span
                            className="delete-action"
                            onClick={() => handleUpdateComment(index)}
                          >
                            Edit
                          </span>
                          <span
                            className="delete-action"
                            onClick={() => handleDeleteComment(index)}
                          >
                            Delete
                          </span>
                        </>
                      )}
                    </li>
                  )
              )}
            </ul>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
