import { prisma } from '@/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

import { keys } from '@/data/icons';

const getRandomAvatar = () => {
  return keys[Math.floor(keys.length * Math.random())];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const gameId = req.query.gameId as string;
  const { name, admin } = req.body;
  const avatar = getRandomAvatar();

  const player = await prisma.player.create({
    data: { gameId, name, admin, avatar },
  });

  res.status(200).json(player);
}
