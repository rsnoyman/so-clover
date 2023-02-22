import type { NextApiRequest, NextApiResponse } from 'next';

import getIsAdmin from '@/utils/api/getIsAdmin';

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

  const isAdmin = await getIsAdmin(playerId);

  res.status(200).json(isAdmin);
}
