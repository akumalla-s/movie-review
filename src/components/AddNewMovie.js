import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function AddNewMovie({isAdmin}) {
  let navigate = useNavigate();
  
  function addNewMovie(){
    if(isAdmin){
      navigate("/add-movie-data");
    }
  }
  return (
    <div>
      <button onClick={addNewMovie}>Add New Movie</button>
    </div>
  )
}
