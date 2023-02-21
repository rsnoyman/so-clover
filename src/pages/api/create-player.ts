// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { gameId } = req.query;
  const { name, admin } = req.body;

  await prisma.player.create({
    data: { gameId: gameId as string, name, admin },
  });

  res.status(200).json({ message: "Player created" });
}
