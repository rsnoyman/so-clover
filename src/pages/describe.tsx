import React from "react";
import useSWRImmutable from "swr/immutable";

import Board from "@/components/Board";
import {
  TopInput,
  BottomInput,
  LeftInput,
  RightInput,
} from "@/components/Input";
import Cards from "@/components/Cards";
import BoardProvider from "@/components/BoardProvider";

async function fetcher(endpoint: string) {
  const response = await fetch(endpoint);
  const json = await response.json();

  return json;
}

export default function DescribePhase() {
  const { data, error, isLoading } = useSWRImmutable(
    "/api/generate-words",
    fetcher
  );

  if (isLoading) {
    return <p>Loading…</p>;
  }

  if (error) {
    return <p>Something has gone wrong</p>;
  }

  return (
    <BoardProvider>
      <Board>
        <Cards words={data} />
        <TopInput />
        <RightInput />
        <BottomInput />
        <LeftInput />
      </Board>
    </BoardProvider>
  );
}
