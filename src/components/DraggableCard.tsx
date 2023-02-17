import React from "react";
import styled from "@emotion/styled";
import { Draggable } from "react-beautiful-dnd";

const Drop = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardWrapper = styled.div`
  position: relative;
  height: calc(var(--board-size) / 2 - 8px);
  width: calc(var(--board-size) / 2 - 8px);
  border-radius: 12%;
  margin: 4px;
  overflow: hidden;
  border: 3px solid;
`;

const Pistil = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  inset: 0;
  margin: auto;
  border-radius: 12%;
  box-shadow: 0 0 0 var(--board-size) white;

  border: 3px solid;
`;

const Word = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  padding: 10px;

  font-size: 24px;
  text-align: center;
  text-transform: uppercase;

  user-select: none;
`;

const TopWord = styled(Word)`
  top: 0;
  left: 50%;
  transform: translateX(-50%) rotate(0deg);
`;
const RightWord = styled(Word)`
  top: 50%;
  right: 0;
  transform: translateY(-50%) rotate(90deg);
`;
const BottomWord = styled(Word)`
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) rotate(180deg);
`;
const LeftWord = styled(Word)`
  bottom: 50%;
  left: 0;
  transform: translateY(50%) rotate(270deg);
`;

export interface CardData {
  id: string;
  words: Array<string>;
}

const Card = ({ id, words }: CardData) => {
  return (
    <Draggable draggableId={id} index={0}>
      {(provided) => (
        <CardWrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Pistil>{id}</Pistil>
          <TopWord>{words[0]}</TopWord>
          <RightWord>{words[1]}</RightWord>
          <BottomWord>{words[2]}</BottomWord>
          <LeftWord>{words[3]}</LeftWord>
        </CardWrapper>
      )}
    </Draggable>
  );
};

export default Card;
