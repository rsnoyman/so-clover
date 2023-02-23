import { prisma } from '@/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

import getNumberOfPlayers from '@/utils/api/getNumberOfPlayers';

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
  const cluesSubmitted = game?.cluesGiven ?? 0;
  const numberOfPlayers = await getNumberOfPlayers(gameId);

  res.status(200).json(cluesSubmitted === numberOfPlayers);
}
