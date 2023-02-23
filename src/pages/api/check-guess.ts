import type { NextApiRequest, NextApiResponse } from 'next';

import getCards from '@/utils/api/getCards';
import mod from '@/utils/mod';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const playerId = req.query.playerId as string;
  const { guess, rotation } = req.body;

  const rotations = rotation / 90;
  const top = mod(rotations, 4);

  const cards = await getCards(playerId);

  const check = cards
    .slice(0, 4)
    .map((card, i) => card.words[0] === guess[i].words[top]);

  res.status(200).json(check);
}
