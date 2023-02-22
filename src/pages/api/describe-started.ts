import { prisma } from '@/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const gameId = req.query.gameId as string;

  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
  });

  res.status(200).json(game?.describeStarted);
}
