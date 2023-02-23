import { prisma } from '@/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const gameId = req.query.gameId as string;
  const { name, admin } = req.body;

  const player = await prisma.player.create({
    data: { gameId, name, admin },
  });

  res.status(200).json(player);
}
