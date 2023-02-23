import { prisma } from '@/prisma';

const getCluesSubmitted = async (playerId: string) => {
  const clue = await prisma.clue.findFirst({
    where: {
      playerId,
    },
  });

  return !!clue;
};

export default getCluesSubmitted;
