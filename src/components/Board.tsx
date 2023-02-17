import React from "react";

import Clover from "@/components/Clover";
import RotateButton from "@/styles/RotateButton";
import { RotateCw, RotateCcw } from "react-feather";
import { BoardContext } from "@/components/BoardProvider";

export default function Board({ children }: { children: React.ReactNode }) {
  const { rotationAngle, setRotationAngle } = React.useContext(BoardContext);

  return (
    <>
      <RotateButton left onClick={() => setRotationAngle(rotationAngle + 90)}>
        <RotateCw size={100} />
      </RotateButton>
      <RotateButton onClick={() => setRotationAngle(rotationAngle - 90)}>
        <RotateCcw size={100} />
      </RotateButton>
      <Clover>{children}</Clover>
    </>
  );
}
