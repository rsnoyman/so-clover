import { GetServerSideProps } from 'next';
import React from 'react';

import { Player } from '@prisma/client';

import Lobby from '@/components/Lobby';
import NewPlayerForm from '@/components/NewPlayerForm';

import getAllPlayers from '@/utils/api/getAllPlayers';
import getIsAdmin from '@/utils/api/getIsAdmin';

interface ServerSideProps {
  playerIdCookie: string | null;
  existingPlayers: Player[];
  isAdmin: boolean;
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (
  context,
) => {
  const playerIdCookie = context.req.cookies?.playerId ?? null;
  const isAdmin = playerIdCookie ? await getIsAdmin(playerIdCookie) : false;

  const gameId = context.query.gameId as string;
  const existingPlayers = await getAllPlayers(gameId);

  return {
    props: { playerIdCookie, existingPlayers, isAdmin },
  };
};

export default function JoinGamePage({
  playerIdCookie,
  existingPlayers,
  isAdmin,
}: ServerSideProps) {
  const [players, setPlayers] = React.useState(existingPlayers);
  const [playerId, setPlayerId] = React.useState(playerIdCookie);

  if (playerId && players?.map(({ id }) => id).includes(playerId)) {
    return <Lobby initialPlayers={players} isAdmin={isAdmin} />;
  }

  return <NewPlayerForm setPlayers={setPlayers} setPlayerId={setPlayerId} />;
}
