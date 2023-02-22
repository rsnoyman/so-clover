import type { NextApiRequest, NextApiResponse } from 'next';

import getPlayers from '@/utils/getPlayers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const gameId = req.query?.gameId as string;
  const players = await getPlayers(gameId);

  res.status(200).json(players);
}
