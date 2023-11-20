import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

export default function MovieReview() {
  const username = useSelector((state) => state.auth.username);

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

  function handleBackButton() {
    navigate("/");
  }

  const findMovieUrl = `https://smooth-comfort-405104.uc.r.appspot.com/document/findOne/movies/${movieId}`;
  const updateMovieUrl = `https://smooth-comfort-405104.uc.r.appspot.com/document/updateOne/movies/${movieId}`;
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
      const updatedMovie = { ...movie };

      const newCommentData = {
        user: username || Date.now().toString(), // Use username if available, else use timestamp
        comment: comment,
      };

      updatedMovie.reviewComments.push(newCommentData);

      const response = await axios.put(updateMovieUrl, updatedMovie, config);
      setMovie(response.data.data);
      setComment("");

      await getMovieData();
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
    <div>
      {movie ? (
        <>
          <h2>{movie.movieName}</h2>
          <p>Year of Release: {movie.yearOfRelease}</p>
          <img
            src={movie.moviePhoto}
            alt={movie.movieName}
            style={{ maxWidth: '100px', maxHeight: '150px' }}
          />
          <p>Rating: {movie.rating}</p>
          <h3>Reviews</h3>
          <ul>
            {movie.reviewComments.map((comment, index) => (
              <li key={index}>
                <strong>User:</strong> {comment.user},{' '}
                <strong>Comment:</strong> {comment.comment}
              </li>
            ))}
          </ul>
          <div>
            <h3>Add Your Review</h3>
            <div>
              <label>Comment:</label>
              <input
                type="text"
                value={comment}
                onChange={handleCommentChange}
              />
            </div>
            <button onClick={handleAddComment}>Add Comment</button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <div>
        <button onClick={handleBackButton}>Back</button>
      </div>
    </div>
  );
}
