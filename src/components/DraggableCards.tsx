import React from 'react';

import DraggableCard from '@/components/DraggableCard';

import { CardData } from '@/utils/api/getAllCards';

interface Props {
  cards: CardData[];
  correctCards: boolean[];
}

const Cards = ({ cards, correctCards }: Props) => {
  return (
    <>
      {cards.map(({ id, words }, index) => (
        <DraggableCard
          key={id}
          index={index}
          words={words}
          isCorrect={!!correctCards[index]}
        />
      ))}
    </>
  );
};

export default React.memo(Cards);
