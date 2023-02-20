import React from "react";
import styled from "@emotion/styled";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import useSWRImmutable from "swr/immutable";

import Board from "@/components/Board";
import {
  TopInput,
  BottomInput,
  LeftInput,
  RightInput,
} from "@/components/Input";
import Cards from "@/components/DraggableCards";
import SpareCard from "@/components/DraggableSpareCard";
import { BoardContext } from "@/components/BoardProvider";

const SparePile = styled.div`
  position: fixed;
  left: 50px;
  bottom: 50px;
`;
async function fetcher(endpoint: string) {
  const response = await fetch(endpoint);
  const json = await response.json();

  return json;
}

export default function GuessPage() {
  const { cardData, setCardData } = React.useContext(BoardContext);

  const {
    data,
    error: cardDataError,
    isLoading: cardDataIsLoading,
  } = useSWRImmutable<string[]>(`/api/load-words/${}`, fetcher);
  React.useEffect(() => {
    if (data) {
      setCardData(
        [0, 1, 2, 3, 4].map((i) => ({
          id: i,
          words: data.slice(i * 4, i * 4 + 4),
        }))
      );
    }
  }, [data, setCardData]);

  if (cardDataIsLoading) {
    return <p>Loading…</p>;
  }

  if (cardDataError) {
    return <p>Something has gone wrong</p>;
  }

  return (
    <>
      {cardData && (
        <DndProvider backend={HTML5Backend}>
          <Board>
            <Cards cardData={cardData.slice(0, 4)} />
            <TopInput />
            <RightInput />
            <BottomInput />
            <LeftInput />
          </Board>
          <SparePile>
            <SpareCard cardData={cardData[4]} />
          </SparePile>
        </DndProvider>
      )}
    </>
  );
}
