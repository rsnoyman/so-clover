import type { Identifier } from 'dnd-core';
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { CheckCircle, RefreshCw } from 'react-feather';

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
  index: number;
  words: Array<string>;
  isCorrect: boolean;
}

interface DragItem {
  index: number;
  type: string;
}

const ItemTypes = {
  CARD: 'card',
};

const Card = ({ index, words, isCorrect }: Props) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { rotationAngle, cardData, setCardData, moveCard } =
    React.useContext(BoardContext);
  const isSpare = index === 4;
  const canDragAndDrop = isSpare || !isCorrect;

  const [{ handlerId, isHovered }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null; isHovered: boolean }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isHovered: canDragAndDrop && monitor.isOver(),
      };
    },
    canDrop() {
      return canDragAndDrop;
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
    canDrag() {
      return canDragAndDrop;
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const handleDoubleClick = () => {
    if (!canDragAndDrop) return;

    const newCardData = [...cardData];
    const card = newCardData[index];
    card.words = card.words.map(
      (x, wordIndex) => card.words[(wordIndex + 3) % 4],
    );

    setCardData(newCardData);
  };

  return (
    <DraggableCardWrapper
      ref={ref}
      data-handler-id={handlerId}
      isHidden={isDragging}
      isHighlighted={isHovered}
      rotationAngle={isSpare ? 0 : rotationAngle}
      onDoubleClick={handleDoubleClick}
    >
      <Pistil>{canDragAndDrop ? <RefreshCw /> : <CheckCircle />}</Pistil>
      <TopWord>{words[0]}</TopWord>
      <RightWord>{words[1]}</RightWord>
      <BottomWord>{words[2]}</BottomWord>
      <LeftWord>{words[3]}</LeftWord>
    </DraggableCardWrapper>
  );
};

export default Card;
