import React from "react";

import Board from "@/components/Board";
import {
  TopInput,
  BottomInput,
  LeftInput,
  RightInput,
} from "@/components/Input";
import Cards from "@/components/Cards";

export default function DescribeStage() {
  return (
    <Board>
      <Cards />
      <TopInput />
      <RightInput />
      <BottomInput />
      <LeftInput />
    </Board>
  );
}
