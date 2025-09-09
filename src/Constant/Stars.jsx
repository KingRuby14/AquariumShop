import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Stars = ({ rating }) => {
  const stars = [];

  // Fill stars array with icons based on rating
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} color="#FFD700" />); // full star
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} color="#FFD700" />); // half star
    } else {
      stars.push(<FaRegStar key={i} color="#FFD700" />); // empty star
    }
  }

  return <div className="star-rating">{stars}</div>;
};

export default Stars;
