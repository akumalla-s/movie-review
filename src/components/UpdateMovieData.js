import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import URL from '../services/URL';
import GetToken from '../services/GetToken';

export default function UpdateMovieData() {

  const { movieId } = useParams();
  let navigate = useNavigate();

  const findMovieUrl = URL.findMovieUrl();
  const findMovieWithId = `${findMovieUrl}/${movieId}`;
  const updateMovieUrl = URL.updateMovieUrl();
  const updateMovieWithId = `${updateMovieUrl}/${movieId}`;
  const token = GetToken.returnToken();
  const config = { headers: { Authorization: `${token}` } };

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
  const [errorMessage, setErrorMessage] = useState('');

  const getMovieData = async () => {
    try {
      const response = await axios.get(findMovieWithId, config);
      setMovie(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    getMovieData();
  },[]);

  const handleInputChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setMovie({
        ...movie,
        moviePhoto: reader.result,
      });
    };

    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  const handleBackButton = ()=>{
   navigate(`/review/${movieId}`);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Updating movie data: ", movie);
    try {
      var response = await axios.put(updateMovieWithId, movie, config);
      console.log(response);
      if(response.data.status === "success"){
        setErrorMessage("Movie added successfully!");
        setMovie({
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
            value={movie.movieName}
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
            value={movie.yearOfRelease}
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
        {movie.moviePhoto === "" || movie.moviePhoto === null ? (
          ""
        ) : (
          <img alt={movie.movieName} width={100} height={100} src={movie.moviePhoto} />
        )}
        </div>
        <button onClick={handleBackButton}>Back</button>
        {' '}
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
