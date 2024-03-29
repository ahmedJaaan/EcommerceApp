import React from "react";
import Typewriter from "typewriter-effect";

const TypewriterEffect = ({ text }) => (
  <Typewriter
    options={{
      strings: text,
      autoStart: true,
      loop: true,
    }}
  />
);

export default TypewriterEffect;
