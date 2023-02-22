// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export const getPlayers = async (gameId: string) => {
  const players = await prisma.player.findMany({
    where: {
      gameId: gameId as string,
    },
  });

  return players;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const gameId = req.query?.gameId as string;
  const players = await getPlayers(gameId);

  res.status(200).json(players);
}
