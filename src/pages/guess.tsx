import React from "react";
import styled from "@emotion/styled";
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
import SpareCard from "@/components/DraggableSpareCard";
import BoardProvider from "@/components/BoardProvider";

async function fetcher(endpoint: string) {
  const response = await fetch(endpoint);
  const json = await response.json();

  return json;
}

const SparePile = styled.div`
  position: fixed;
  left: 50px;
  bottom: 50px;
`;

export default function GuessStage() {
  const [cardData, setCardData] = React.useState<CardData[]>(); // use context?
  const [spareCardData, setSpareCardData] = React.useState<CardData>();
  const { data, error, isLoading } = useSWRImmutable<string[]>(
    "/api/words",
    fetcher
  );

  // TODO set this id in describe phase
  // Drag and drop does not respect rotation - use horse example
  React.useMemo(() => {
    if (data) {
      setCardData(
        [0, 1, 2, 3].map((i) => ({
          id: i,
          words: data.slice(i * 4, i * 4 + 4),
        }))
      );
      setSpareCardData({ id: -1, words: data.slice(16, 20) });
    }
  }, [data]);

  const moveCard = React.useCallback(
    (dragIndex: number, hoverIndex: number) => {
      if (!cardData || !spareCardData) return;

      const newCardData = [...cardData];

      if (dragIndex === -1) {
        const tmp = { ...spareCardData };
        setSpareCardData(newCardData[hoverIndex]);
        newCardData[hoverIndex] = tmp;
        setCardData(newCardData);
        return;
      }

      if (hoverIndex === -1) {
        const tmp = { ...spareCardData };
        setSpareCardData(newCardData[dragIndex]);
        newCardData[dragIndex] = tmp;
        setCardData(newCardData);
        return;
      }

      const tmp = newCardData[dragIndex];
      newCardData[dragIndex] = newCardData[hoverIndex];
      newCardData[hoverIndex] = tmp;
      setCardData(newCardData);
    },
    [cardData, spareCardData]
  );

  if (isLoading) {
    return <p>Loading…</p>;
  }

  if (error) {
    return <p>Something has gone wrong</p>;
  }

  return (
    cardData &&
    spareCardData && (
      <BoardProvider>
        <DndProvider backend={HTML5Backend}>
          <Board>
            <Cards cardData={cardData} moveCard={moveCard} />
            <TopInput />
            <RightInput />
            <BottomInput />
            <LeftInput />
          </Board>
          <SparePile>
            <SpareCard cardData={spareCardData} moveCard={moveCard} />
          </SparePile>
        </DndProvider>
      </BoardProvider>
    )
  );
}
