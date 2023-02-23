import type { NextApiRequest, NextApiResponse } from 'next';

import getAllPlayers from '@/utils/api/getAllPlayers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const gameId = req.query.gameId as string;
  const players = await getAllPlayers(gameId);

  res.status(200).json(players);
}
