// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import words from "@/data/word-list";

type Data = Array<string>;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const chosenWords = new Set<string>();
  while (chosenWords.size < 16) {
    const r = Math.floor(Math.random() * words.length);
    chosenWords.add(words[r]);
  }
  res.status(200).json(Array.from(chosenWords));
}
