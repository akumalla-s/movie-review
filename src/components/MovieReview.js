import React from 'react'
import { useParams } from 'react-router-dom';

export default function MovieReview() {
  
  const { restaurentId } = useParams();

  return (
    <div>
      send movie review to backend
    </div>
  )
}
