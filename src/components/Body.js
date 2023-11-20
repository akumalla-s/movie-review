import React, { useEffect, useState } from 'react'
import HelperService from '../services/HelperService';

export default function Body() {
  const user = HelperService.getCurrentUserData();
  const [username, setUsername] = useState("");
  useEffect(() => {
    if (user) {
      setUsername(user.username);   
    }
  }, [user]);
  

  return (
    <div>
      <h1>Logged In Username: {username}</h1>
      Display Movies to Guest View 
    </div>
  )
}
