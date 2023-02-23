import { prisma } from '@/prisma';

const getPlayers = async (gameId: string) => {
  const players = await prisma.player.findMany({
    where: {
      gameId: gameId,
    },
  });

  return players;
};

export default getPlayers;
