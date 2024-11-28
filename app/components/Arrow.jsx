import React from "react";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const fadeInOut = keyframes`
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
`;

const moveUpDown = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(10px); }
`;

const moveLeftRight = keyframes`
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(10px); }
`;

const ArrowSvg = styled.svg`
  animation: ${fadeInOut} 2s ease-in-out infinite,
    ${(props) =>
        props.direction === "up" || props.direction === "down"
          ? moveUpDown
          : moveLeftRight}
      2s ease-in-out infinite;
`;

const Arrow = ({ direction }) => {
  const getPath = () => {
    switch (direction) {
      case "up":
        return "M10 20 L20 10 L30 20";
      case "down":
        return "M10 10 L20 20 L30 10";
      case "left":
        return "M20 10 L10 20 L20 30";
      case "right":
        return "M10 10 L20 20 L10 30";
      default:
        return "";
    }
  };

  return (
    <ArrowSvg width="40" height="40" viewBox="0 0 40 40" direction={direction}>
      <path d={getPath()} stroke="currentColor" strokeWidth="3" fill="none" />
    </ArrowSvg>
  );
};

export default Arrow;
