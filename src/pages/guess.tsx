import React from "react";
import styled from "@emotion/styled";
import useSWRImmutable from "swr/immutable";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import Board from "@/components/Board";
import {
  TopInput,
  BottomInput,
  LeftInput,
  RightInput,
} from "@/components/Input";
import Card, { CardData } from "@/components/DraggableCard";
import Droppable from "@/components/StrictModeDroppable";

async function fetcher(endpoint: string) {
  const response = await fetch(endpoint);
  const json = await response.json();

  return json;
}

const Zone = styled.div`
  display: flex;
  flex-direction: column;
`;

const SpareZone = styled(Zone)`
  position: fixed;
  left: 50px;
  bottom: 50px;
`;

interface Cards {
  [key: string]: CardData;
}

export default function GuessStage() {
  const [cards, setCards] = React.useState<Cards>(); // use context?
  const { data, error, isLoading } = useSWRImmutable<string[]>(
    "/api/words",
    fetcher
  );

  const onDragEnd = React.useCallback(
    (result: DropResult) => {
      if (!cards) {
        return;
      }

      const { destination, source } = result;

      if (!destination) {
        return;
      }

      if (destination.droppableId === source.droppableId) {
        return;
      }

      const prevSourceCardData = { ...cards[source.droppableId] };
      const prevDestinationCardData = { ...cards[destination.droppableId] };

      const newCards = {
        ...cards,
        [source.droppableId]: prevDestinationCardData,
        [destination.droppableId]: prevSourceCardData,
      };

      setCards(newCards);
      return;
    },
    [cards]
  );

  // TODO set this id in describe phase
  // Drag and drop does not respect rotation - use horse example
  React.useMemo(() => {
    if (data) {
      setCards({
        spare: { id: "a", words: data.slice(0, 4) },
        first: { id: "b", words: data.slice(4, 8) },
        second: { id: "c", words: data.slice(8, 12) },
        third: { id: "d", words: data.slice(12, 16) },
        fourth: { id: "e", words: data.slice(16, 20) },
      });
    }
  }, [data]);

  if (isLoading) {
    return <p>Loading…</p>;
  }

  if (error) {
    return <p>Something has gone wrong</p>;
  }

  return (
    cards && (
      <DragDropContext
        onDragEnd={onDragEnd}
        // onDragStart={}
        // onDragUpdate={}
      >
        <Board>
          <Droppable droppableId="first">
            {(provided) => (
              <Zone ref={provided.innerRef} {...provided.droppableProps}>
                <Card {...cards.first} />
                {provided.placeholder}
              </Zone>
            )}
          </Droppable>
          <Droppable droppableId="second">
            {(provided) => (
              <Zone ref={provided.innerRef} {...provided.droppableProps}>
                <Card {...cards.second} />
                {provided.placeholder}
              </Zone>
            )}
          </Droppable>
          <Droppable droppableId="third">
            {(provided) => (
              <Zone ref={provided.innerRef} {...provided.droppableProps}>
                <Card {...cards.third} />
                {provided.placeholder}
              </Zone>
            )}
          </Droppable>
          <Droppable droppableId="fourth">
            {(provided) => (
              <Zone ref={provided.innerRef} {...provided.droppableProps}>
                <Card {...cards.fourth} />
                {provided.placeholder}
              </Zone>
            )}
          </Droppable>
          <TopInput />
          <RightInput />
          <BottomInput />
          <LeftInput />
        </Board>
        <Droppable droppableId="spare">
          {(provided) => (
            <SpareZone ref={provided.innerRef} {...provided.droppableProps}>
              <Card {...cards.spare} />
              {provided.placeholder}
            </SpareZone>
          )}
        </Droppable>
      </DragDropContext>
    )
  );
}
