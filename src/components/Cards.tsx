import React from 'react';

import { Card as CardData } from '@prisma/client';

import Card from '@/components/Card';

interface Props {
  cards: CardData[];
}

const Cards = ({ cards }: Props) => {
  return (
    <>
      {cards.slice(0, 4).map(({ id, words }) => (
        <Card key={id} words={words} />
      ))}
    </>
  );
};

export default React.memo(Cards);
