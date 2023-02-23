import { prisma } from '@/prisma';

const getAllClues = async (gameId: string) => {
  const clues = await prisma.clue.findMany({
    where: {
      gameId,
    },
  });
  return clues;
};

export default getAllClues;
