import React from 'react'
import { useParams } from 'react-router-dom';

export default function RestaurentReview() {
  
  const { restaurentId } = useParams();

  return (
    <div>
      send restaurent review to backend
    </div>
  )
}
