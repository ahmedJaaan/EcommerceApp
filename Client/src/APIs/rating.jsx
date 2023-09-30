import React from "react";
import ReactStars from "react-stars";

export const showAverage = (p) => {
  if (p && p.ratings) {
    const ratingsArray = p.ratings;
    if (ratingsArray.length === 0) {
      return <div>No ratings yet</div>;
    }
    const total = ratingsArray.reduce((acc, rating) => acc + rating.star, 0);
    const average = total / ratingsArray.length;

    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <span>
          <ReactStars count={5} value={average} size={50} edit={false} />
        </span>
        <span style={{ marginLeft: "10px", marginTop: "10px" }}>
          ({average.toFixed(2)} Ratings)
        </span>
      </div>
    );
  }

  return null;
};
