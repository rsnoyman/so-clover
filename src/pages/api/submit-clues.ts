import { prisma } from '@/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const gameId = req.query.gameId as string;

  const playerId = req.cookies?.playerId;
  if (!playerId) {
    console.error('user is undefined');
    res.status(500).send(false);
    return;
  }

  const { clues } = req.body;

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

  res.status(200).send('clues submitted');
}
