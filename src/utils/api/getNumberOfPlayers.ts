import { prisma } from '@/prisma';

const getNumberOfPlayers = async (gameId: string) => {
  const game = await prisma.game.findUnique({
    where: { id: gameId },
    include: {
      _count: {
        select: { players: true },
      },
    },
  });

  return game ? game._count.players : 0;
};

export default getNumberOfPlayers;
