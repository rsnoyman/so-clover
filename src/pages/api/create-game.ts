// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = await prisma.game.create({ data: {} });

  res.status(200).json(id);
}
