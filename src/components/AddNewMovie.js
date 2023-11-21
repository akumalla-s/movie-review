import React from 'react'
import { useNavigate } from 'react-router-dom';
import "../css/AddNewMovie.css";

export default function AddNewMovie() {
  let navigate = useNavigate();
  
  function addNewMovie(){
    navigate("/add-movie-data");
  }
  return (
    <div className='add-movie-button'>
      <button onClick={addNewMovie}>Add New Movie</button>
    </div>
  )
}
