import React from "react";
import ReactStars from "react-stars";
const Stars = ({ starClick, numberOfStars }) => {
  return (
    <>
      <ReactStars
        onChange={() => starClick(numberOfStars)}
        count={numberOfStars}
        starSpacing={15}
        size={40}
        color1="#ffd700"
      />
    </>
  );
};

export default Stars;
