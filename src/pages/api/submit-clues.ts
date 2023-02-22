import { prisma } from '@/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const gameId = req.query?.gameId as string;
  const { clues, playerId } = req.body;
  // get player id from cookie
  await prisma.clue.createMany({
    data: clues.map((clue: string, position: number) => ({
      clue,
      position,
      playerId,
    })),
  });

  await prisma.game.update({
    where: {
      id: gameId,
    },
    data: {
      cluesGiven: {
        increment: 1,
      },
    },
  });

  res.status(200);
}
