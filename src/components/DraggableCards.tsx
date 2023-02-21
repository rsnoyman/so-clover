import React from 'react';

import Card from '@/components/DraggableCard';

export interface CardData {
  id: number;
  words: Array<string>;
}

interface Props {
  cardData: Array<CardData>;
}

const Cards = ({ cardData }: Props) => {
  return (
    <>
      {cardData.map(({ id, words }, index) => (
        <Card key={id} id={id} index={index} words={words} />
      ))}
    </>
  );
};

export default React.memo(Cards);
