import React from "react";
import Clover from "@/components/Clover";
import App from "@/styles/App";
import styled from "@emotion/styled";
import { RotateCw, RotateCcw } from "react-feather";

const RotateButton = styled.button<{ left?: boolean }>`
  position: fixed;
  top: 50px;
  background: none;
  border: none;
  ${({ left }) =>
    left
      ? `left: 20%;
  transform: translate(-50%, 0);`
      : `right: 20%;
  transform: translate(50%, 0);`}
`;

export default function Home() {
  const [rotationAngle, setRotationAngle] = React.useState(0);

  return (
    <App>
      <RotateButton left onClick={() => setRotationAngle(rotationAngle + 90)}>
        <RotateCw size={100} />
      </RotateButton>
      <RotateButton onClick={() => setRotationAngle(rotationAngle - 90)}>
        <RotateCcw size={100} />
      </RotateButton>
      <Clover angle={rotationAngle} />
    </App>
  );
}
