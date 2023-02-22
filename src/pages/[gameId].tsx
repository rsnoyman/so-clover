import { getPlayers } from '@/pages/api/get-players';
import { GetServerSideProps } from 'next';
import React from 'react';

import { Player } from '@prisma/client';

import Lobby from '@/components/Lobby';
import NewPlayerForm from '@/components/NewPlayerForm';

interface ServerSideProps {
  playerIdCookie: string | null;
  existingPlayers: Player[];
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (
  context,
) => {
  const playerIdCookie = context.req.cookies?.playerId ?? null;

  const gameId = context.query?.gameId as string;
  const existingPlayers = await getPlayers(gameId);

  return {
    props: { playerIdCookie, existingPlayers },
  };
};

export default function JoinGamePage({
  playerIdCookie,
  existingPlayers,
}: ServerSideProps) {
  const [players, setPlayers] = React.useState(existingPlayers);
  const [playerId, setPlayerId] = React.useState(playerIdCookie);

  if (playerId && players?.map(({ id }) => id).includes(playerId)) {
    return <Lobby />;
  }

  return <NewPlayerForm setPlayers={setPlayers} setPlayerId={setPlayerId} />;
}
