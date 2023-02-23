import React from 'react';

import DraggableCard from '@/components/DraggableCard';

import { CardData } from '@/utils/api/getAllCards';

interface Props {
  card: CardData;
}

const DraggableSpareCard = ({ card: { words } }: Props) => (
  <DraggableCard index={4} words={words} isCorrect />
);

export default DraggableSpareCard;
