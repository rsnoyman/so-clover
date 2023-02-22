import { prisma } from '@/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const playerId = req.cookies?.playerId;

  if (!playerId) {
    console.error('user is undefined');
    res.status(500).send(false);
    return;
  }

  const player = await prisma.player.findUnique({
    where: {
      id: playerId,
    },
  });

  res.status(200).json(player?.admin);
}
