// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/prisma';

const getPlayers = async (gameId: string) => {
  const players = await prisma.player.findMany({
    where: {
      gameId: gameId as string,
    },
  });

  return players;
};

export default getPlayers;
