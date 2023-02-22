// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const playerId = req.cookies?.playerId;

  if (!playerId) {
    res.status(500).send({ error: 'user is undefined' });
    return;
  }

  const player = await prisma.player.findUnique({
    where: {
      id: playerId,
    },
  });

  res.status(200).json(player?.admin);
}
