import { GetServerSideProps } from 'next';
import React from 'react';

import Lobby from '@/components/Lobby';
import NewPlayerForm from '@/components/NewPlayerForm';

interface Props {
  playerId: string | null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const playerId = context.req.cookies?.playerId ?? null;
  return {
    props: { playerId },
  };
};

export default function JoinGamePage({ playerId }: Props) {
  return playerId ? <Lobby /> : <NewPlayerForm />;
}
