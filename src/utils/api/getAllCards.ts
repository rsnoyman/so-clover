import { prisma } from '@/prisma';

import { Card } from '@prisma/client';

export type CardData = Pick<Card, 'id' | 'words' | 'playerId'>;

const getAllCards = async (gameId: string): Promise<CardData[]> => {
  const cards = await prisma.card.findMany({
    where: {
      gameId,
    },
    // Don't show correct position! Only select relevant cols
    select: {
      id: true,
      words: true,
      playerId: true,
    },
    orderBy: {
      id: 'asc',
    },
  });

  // Rotate cards
  cards.forEach((card) => {
    const shuffle = Math.floor(Math.random() * 4);
    card.words = card.words.map(
      (word, wordIndex) => card.words[(wordIndex + shuffle) % 4],
    );
  });

  return cards;
};

export default getAllCards;
