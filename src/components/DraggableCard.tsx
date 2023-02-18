import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useDrag, useDrop } from "react-dnd";
import type { Identifier } from "dnd-core";
import { BoardContext } from "@/components/BoardProvider";

const rotation = (angle: number) => css`
  transform: rotate(${-angle}deg);
`;

const CardWrapper = styled.div<{
  isHidden: boolean;
  isHighlighted: boolean;
  rotationAngle: number;
}>`
  position: relative;
  height: calc(var(--board-size) / 2 - 8px);
  width: calc(var(--board-size) / 2 - 8px);
  border-radius: 12%;
  z-index: 1;
  margin: 4px;
  overflow: hidden;

  border: 3px solid ${({ isHighlighted }) => (isHighlighted ? "blue" : null)};
  opacity: ${({ isHidden }) => (isHidden ? 0 : 1)};

  ${({ rotationAngle }) => rotation(rotationAngle)}
`;

const Pistil = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  inset: 0;
  margin: auto;
  border-radius: 12%;
  box-shadow: 0 0 0 var(--board-size) white;

  border: inherit;
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

interface Props {
  id: number;
  index: number;
  words: Array<string>;
}

interface DragItem {
  index: number;
  type: string;
}

const ItemTypes = {
  CARD: "card",
};

const Card = ({ id, index, words }: Props) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { rotationAngle, cardData, setCardData, moveCard } =
    React.useContext(BoardContext);

  const [{ handlerId, isHovered }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null; isHovered: boolean }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isHovered: monitor.isOver(),
      };
    },
    drop(item: DragItem) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const handleDoubleClick = () => {
    if (!cardData) return;

    const newCardData = [...cardData];
    const card = newCardData[index];
    card.words = card.words.map(
      (x, wordIndex) => card.words[(wordIndex + 3) % 4]
    );

    setCardData(newCardData);
  };

  const isSpare = index === 4;

  return (
    <CardWrapper
      ref={ref}
      data-handler-id={handlerId}
      isHidden={isDragging}
      isHighlighted={isHovered}
      rotationAngle={isSpare ? 0 : rotationAngle}
      onDoubleClick={handleDoubleClick}
    >
      <Pistil />
      <TopWord>{words[0]}</TopWord>
      <RightWord>{words[1]}</RightWord>
      <BottomWord>{words[2]}</BottomWord>
      <LeftWord>{words[3]}</LeftWord>
    </CardWrapper>
  );
};

export default Card;
