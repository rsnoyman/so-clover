// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { gameId } = req.query;
  const { name, admin } = req.body;

  const player = await prisma.player.create({
    data: { gameId: gameId as string, name, admin },
  });

  res.status(200).json(player);
}
