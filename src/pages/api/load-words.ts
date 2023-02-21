// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = Array<string>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { player } = req.query;
  const cards = await prisma.card.findMany({
    where: {
      playerId: player as string,
    },
  });

  const words = cards
    .filter(({ dummy }) => !dummy)
    .map(({ words }) => words)
    .flat();

  res.status(200).json(words);
}
