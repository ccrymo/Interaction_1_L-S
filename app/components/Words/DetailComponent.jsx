"use client";

import React from "react";
import Detail from "./Detail";
import { Fade } from "react-awesome-reveal";
import Arrow from "../Arrow";

const DetailComponent = ({ definition, synonym, antonym }) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col mt-20 items-center justify-center">
        <Arrow direction="up" />
      </div>
      <div className="flex flex-col h-screen items-start justify-center px-4 relative">
        <Fade duration={1000}>
          <Detail
            label="Definition"
            title={definition}
            className="text-lg md:text-xl lg:text-2xl"
          />
        </Fade>
        <Fade duration={1000} delay={200}>
          <Detail
            label="Synonym"
            title={synonym}
            className="text-lg md:text-xl lg:text-2xl"
          />
        </Fade>
        <Fade duration={1000} delay={400}>
          <Detail
            label="Antonym"
            title={antonym}
            className="text-lg md:text-xl lg:text-2xl"
          />
        </Fade>
      </div>
    </div>
  );
};

export default DetailComponent;
