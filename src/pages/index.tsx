import { GetServerSideProps } from 'next';
import React from 'react';

import NewPlayerForm from '@/components/NewPlayerForm';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const playerId = context.req.cookies?.playerId ?? null;
  return {
    props: { playerId },
  };
};

export default function Home() {
  return <NewPlayerForm />;
}
