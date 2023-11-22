import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Rating } from "@mui/material";
import "../css/MovieReview.css";
import GetToken from '../services/GetToken';
import URL from "../services/URL";

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
  const [message, setMessage] = useState('');

  const findMovieUrl = URL.findMovieUrl();
  const updateMovieUrl = URL.updateMovieUrl();
  const deleteMovieUrl = URL.deleteMovieUrl();
  const findMovieWithId = `${findMovieUrl}/${movieId}`;
  const updateMovieWithId = `${updateMovieUrl}/${movieId}`;
  const deleteMovieWithId = `${deleteMovieUrl}/${movieId}`;
  const token = GetToken.returnToken();
  const config = { headers: { Authorization: `${token}` } };

  const getMovieData = async () => {
    try {
      const response = await axios.get(findMovieWithId, config);
      setMovie(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovieData();
  }, []);

  const handleRatingChange = (event, newValue) => {
    if (newValue > 0) {
      setUserRating(newValue.toString());
  
      setMovie((prevMovie) => ({
        ...prevMovie,
        rating: ((prevMovie.totalRatingValue + newValue) / (prevMovie.numberOfUsersGivenRating + 1)).toString(),
      }));
    }
  };
  
  useEffect(() => {
    //console.log(movie);
  }, [movie]);

  const handleAddComment = async () => {
    try {
      if (!userRating) {
        setMessage('Rating is required value!');
        return;
      }

      const updatedMovie = { ...movie };

      const newCommentData = {
        user: username || Date.now().toString(),
        comment: comment,
        Rating: userRating,
        timestamp: new Date().toLocaleString()
      };

      const existingUserCommentIndex = updatedMovie.reviewComments.findIndex(
        (existingComment) => existingComment.user === newCommentData.user
      );  

      const existingUserComment = updatedMovie.reviewComments.find(
        (existingComment) => existingComment.user === newCommentData.user
      );

      if (existingUserComment) {
        // If the user already has a comment, update it

        const existingUserComment = updatedMovie.reviewComments[existingUserCommentIndex];
        const previousRating = parseFloat(existingUserComment.Rating);

        existingUserComment.comment = newCommentData.comment;
        existingUserComment.Rating = newCommentData.Rating;
        existingUserComment.timestamp = newCommentData.timestamp;

        // Update numberOfUsersGivenRating and totalRatingValue
        //updatedMovie.numberOfUsersGivenRating -= 1;
        updatedMovie.totalRatingValue -= previousRating;
        updatedMovie.totalRatingValue += parseFloat(newCommentData.Rating);
        updatedMovie.rating = updatedMovie.totalRatingValue/updatedMovie.numberOfUsersGivenRating;
      } else {
        // If the user doesn't have a comment, add a new comment
        updatedMovie.reviewComments.push(newCommentData);
        // Update numberOfUsersGivenRating and totalRatingValue
        updatedMovie.numberOfUsersGivenRating += 1;
        updatedMovie.totalRatingValue += parseFloat(newCommentData.Rating);
        updatedMovie.rating = updatedMovie.totalRatingValue/updatedMovie.numberOfUsersGivenRating;
      }

      await axios.put(updateMovieWithId, updatedMovie, config);
      setComment("");
      setMessage("");
      setUserRating("");
      await getMovieData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async (index) => {
    try {
      const updatedMovie = { ...movie };
      updatedMovie.reviewComments.splice(index, 1);

      await axios.put(updateMovieWithId, updatedMovie, config);
      await getMovieData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateComment = async (index) => {
    try {
      setComment(movie.reviewComments[index].comment);

      await new Promise((resolve) => setTimeout(resolve, 0));
        
      const updatedMovie = { ...movie };
      updatedMovie.reviewComments[index].comment = comment;
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //console.log("Updated comment: " + comment);
  }, [comment]);

  const handleDeleteMovie = async () => {
    try {
      await axios.delete(deleteMovieWithId, config);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditMovie = async () => {
    navigate(`/update-movie-data/${movieId}`)
  }

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
                <button onClick={handleEditMovie}>Edit Movie</button>
              )}
              {' '}
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
            <strong >{message}</strong>
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
                defaultValue={0.0}
                precision={0.5}
                onChange={handleRatingChange}
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
                      <strong>Rated:</strong> {comment.Rating}{" "}
                      <strong>Comment:</strong> {comment.comment}{" "}
                      <strong>Posted On:</strong> {comment.timestamp}{" "}
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
