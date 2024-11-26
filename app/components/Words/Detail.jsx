'use client'

import { Fade } from "react-awesome-reveal";

const Detail = ({ label, title }) => {
  return (
    <Fade  duration="2000">
      <h3 className="text-3xl mb-5 md:text-5xl md:mb-8 lg:text-5xl lg:mb-10">
        <div className="font-bold text-emerald-600">{label}:</div> {title}
      </h3>
    </Fade>
  );
};

export default Detail;

