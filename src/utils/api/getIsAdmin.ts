import { prisma } from '@/prisma';

const getIsAdmin = async (playerId: string) => {
  const player = await prisma.player.findUnique({
    where: {
      id: playerId,
    },
  });

  return !!player?.admin;
};

export default getIsAdmin;
