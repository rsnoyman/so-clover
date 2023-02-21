import type { Identifier } from 'dnd-core';
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { BoardContext } from '@/components/BoardProvider';

import {
  BottomWord,
  DraggableCardWrapper,
  LeftWord,
  Pistil,
  RightWord,
  TopWord,
} from '@/styles/Card';

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
  CARD: 'card',
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
      (x, wordIndex) => card.words[(wordIndex + 3) % 4],
    );

    setCardData(newCardData);
  };

  const isSpare = index === 4;

  return (
    <DraggableCardWrapper
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
    </DraggableCardWrapper>
  );
};

export default Card;
