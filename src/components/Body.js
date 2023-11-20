import React, { useEffect, useState } from 'react'
import HelperService from '../services/HelperService';
import AddNewMovie from './AddNewMovie';
import DisplayMovies from './DisplayMovies';

export default function Body() {

  const user = HelperService.getCurrentUserData();

  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username);   
      setIsAdmin(user.isAdmin);
    }
  }, [user]);
  

  return (
    <div>
      <h1>Logged In Username: {username}</h1>
      {isAdmin && <AddNewMovie />} 
      <DisplayMovies />
    </div>
  )
}
