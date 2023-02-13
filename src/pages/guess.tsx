import React from "react";
import useSWRImmutable from "swr/immutable";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Board from "@/components/Board";
import {
  TopInput,
  BottomInput,
  LeftInput,
  RightInput,
} from "@/components/Input";
import Cards, { CardData } from "@/components/DraggableCards";

async function fetcher(endpoint: string) {
  const response = await fetch(endpoint);
  const json = await response.json();

  return json;
}

export default function GuessStage() {
  const [cardData, setCardData] = React.useState<CardData[]>();
  const { data, error, isLoading } = useSWRImmutable("/api/words", fetcher);

  React.useMemo(() => {
    if (data) {
      setCardData(
        [0, 1, 2, 3].map((i) => ({
          id: i,
          words: data.slice(i * 4, i * 4 + 4),
        }))
      );
    }
  }, [data]);

  if (isLoading) {
    return <p>Loading…</p>;
  }

  if (error) {
    return <p>Something has gone wrong</p>;
  }

  return (
    cardData && (
      <DndProvider backend={HTML5Backend}>
        <Board>
          <Cards cardData={cardData} setCardData={setCardData} />
          <TopInput />
          <RightInput />
          <BottomInput />
          <LeftInput />
        </Board>
      </DndProvider>
    )
  );
}
