import { prisma } from '@/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

import getPlayers from '@/utils/api/getPlayers';
import range from '@/utils/range';

import words from '@/data/word-list';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const gameId = req.query.gameId as string;
  const players = await getPlayers(gameId);

  const cards = players.flatMap(({ id }, i) =>
    range(5).map((j) => {
      const start = i * 20 + j * 4;
      return {
        words: words.slice(start, start + 4),
        boardPosition: j,
        playerId: id,
      };
    }),
  );

  await prisma.card.createMany({
    data: cards,
  });

  const { describeStarted } = await prisma.game.update({
    where: {
      id: gameId,
    },
    data: {
      describeStarted: true,
    },
  });

  res.status(200).json(describeStarted);
}
