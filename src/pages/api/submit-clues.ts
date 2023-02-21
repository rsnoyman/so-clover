// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { gameId } = req.query;
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
      id: Number(gameId),
    },
    data: {
      cluesGiven: {
        increment: 1,
      },
    },
  });

  // const numPlayers = await prisma.game.findMany({
  //   include: {
  //     _count: {
  //       select: { players: true },
  //     },
  //   },
  // });

  res.status(200);
}
