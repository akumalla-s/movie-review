import axios from "axios";
import React, { useState } from "react";
import "../css/AddMovieData.css";

const AddMovieData = () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTkzMWM4NjY5ZjJjZjM0N2YyNmMyZCIsInVzZXJuYW1lIjoiMDAyNzk4MTY2UyIsImlhdCI6MTcwMDM0NDI2OCwiZXhwIjoxNzAxNjQwMjY4fQ.3YuL_w8ovVtTfS0RvFuPSf-f1DbXF4jL16hGqmJyJIo";
  const addMovieUrl =
    "https://smooth-comfort-405104.uc.r.appspot.com/document/createorupdate/movies";
  const config = { headers: { Authorization: `${token}` } };

  const [errorMessage, setErrorMessage] = useState('');

  const [movieData, setMovieData] = useState({
    movieName: "",
    yearOfRelease: "",
    moviePhoto: null,
    rating: "",
    reviewComments: [],
    totalRatingValue: 0,
    numberOfUsersGivenRating: 0
  });

  const handleInputChange = (e) => {
    setMovieData({
      ...movieData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setMovieData({
        ...movieData,
        moviePhoto: reader.result,
      });
    };

    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Submitting movie data: ", movieData);
    try {
      var response = await axios.post(addMovieUrl, movieData, config);
      console.log(response);
      if(response.data.status === "success"){
        setErrorMessage("Movie added successfully!");
        setMovieData({
          movieName: '',
          yearOfRelease:'',
          moviePhoto: null
        })

      }
    } catch (error) {
      console.log("Error: "+ error)
    }
  };

  return (
    <div className="movie-data-container">
      <h2 className="container-title">Add Movie Data</h2>
      <h3 className="error-message">{errorMessage}</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Movie Name:
          <input
            required
            type="text"
            name="movieName"
            value={movieData.movieName}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Year of Release:
          <input
            required
            type="text"
            name="yearOfRelease"
            value={movieData.yearOfRelease}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Upload Movie Photo:
          <input required type="file" onChange={handleImageChange} />
        </label>
        <br />
        <div>
        {movieData.moviePhoto === "" || movieData.moviePhoto === null ? (
          ""
        ) : (
          <img alt={movieData.movieName} width={100} height={100} src={movieData.moviePhoto} />
        )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddMovieData;
