import React from "react";
import styled from "@emotion/styled";
import { useDrag, useDrop } from "react-dnd";
import type { Identifier } from "dnd-core";

const CardWrapper = styled.div<{ isHidden: boolean; isHighlighted: boolean }>`
  position: relative;
  height: calc(var(--board-size) / 2 - 8px);
  width: calc(var(--board-size) / 2 - 8px);
  border-radius: 12%;
  z-index: 1;
  margin: 4px;
  overflow: hidden;

  border: 3px solid ${({ isHighlighted }) => (isHighlighted ? "blue" : null)};
  opacity: ${({ isHidden }) => (isHidden ? 0 : 1)};
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
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  type: string;
}

const ItemTypes = {
  CARD: "card",
};

const Card = ({ id, index, words, moveCard }: Props) => {
  const ref = React.useRef<HTMLDivElement>(null);
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

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
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

  return (
    <CardWrapper
      ref={ref}
      data-handler-id={handlerId}
      isHidden={isDragging}
      isHighlighted={isHovered}
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
