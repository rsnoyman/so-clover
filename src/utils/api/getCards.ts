import { prisma } from '@/prisma';

const getCards = async (playerId: string) => {
  const cards = await prisma.card.findMany({
    where: {
      playerId,
    },
    orderBy: {
      boardPosition: 'asc',
    },
  });

  return cards;
};

export default getCards;
