import React, { useEffect, useState } from 'react'
import HelperService from '../services/HelperService';
import AddNewMovie from './AddNewMovie';
import DisplayMovies from './DisplayMovies';

export default function Body({searchTerm}) {

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
      {isAdmin && <AddNewMovie />} 
      <DisplayMovies searchTerm={searchTerm}/>
    </div>
  )
}
