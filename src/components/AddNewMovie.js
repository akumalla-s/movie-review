import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function AddNewMovie() {
  let navigate = useNavigate();
  
  function addNewMovie(){
    navigate("/add-movie-data");
  }
  return (
    <div>
      <button onClick={addNewMovie}>Add New Movie</button>
    </div>
  )
}
