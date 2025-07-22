import React from "react";

const Animate = ({ children, type = "fade-up", duration = 1000, delay = 0 }) => {
  return (
    <div
      data-aos={type}
      data-aos-duration={duration}
      data-aos-delay={delay}
    >
      {children}
    </div>
  );
};

export default Animate;
