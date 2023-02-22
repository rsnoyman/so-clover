import { GetServerSideProps } from 'next';
import React from 'react';
import useSWRImmutable from 'swr/immutable';

import styled from '@emotion/styled';
import { Card } from '@prisma/client';

import Board from '@/components/Board';
import BoardProvider from '@/components/BoardProvider';
import Cards from '@/components/Cards';
import {
  BottomInput,
  LeftInput,
  RightInput,
  TopInput,
} from '@/components/Input';

import fetcher from '@/utils/fetcher';

import Button from '@/styles/Button';

const ButtonWrapper = styled.div`
  position: fixed;
  right: 50px;
  bottom: 50px;
`;

interface ServerSideProps {
  playerId: string | null;
  cards: Card[];
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (
  context,
) => {
  const playerId = context.req.cookies?.playerId ?? null;

  return {
    props: { playerId, cards: [] },
  };
};

export default function DescribePhase() {
  const [topClue, setTopClue] = React.useState('t');
  const [rightClue, setRightClue] = React.useState('r');
  const [bottomClue, setBottomClue] = React.useState('b');
  const [leftClue, setLeftClue] = React.useState('l');

  const { data, error, isLoading } = useSWRImmutable(
    '/api/load-words',
    fetcher,
  );

  if (isLoading) {
    return <p>Loading…</p>;
  }

  if (error) {
    return <p>Something has gone wrong</p>;
  }

  const handleSubmit = () => {
    const clues = [topClue, rightClue, bottomClue, leftClue];

    if (clues.some((clue) => !clue)) return; // focus the empty one (?)

    fetch('/api/submit-clues?gameId=0', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clues, playerId: 1 }),
    });
  };

  return (
    <BoardProvider>
      <Board>
        <Cards words={data} />
        <TopInput
          value={topClue}
          onChange={(event) => {
            setTopClue(event.target.value);
          }}
        />
        <RightInput
          value={rightClue}
          onChange={(event) => {
            setRightClue(event.target.value);
          }}
        />
        <BottomInput
          value={bottomClue}
          onChange={(event) => {
            setBottomClue(event.target.value);
          }}
        />
        <LeftInput
          value={leftClue}
          onChange={(event) => {
            setLeftClue(event.target.value);
          }}
        />
      </Board>
      <ButtonWrapper>
        <Button onClick={handleSubmit}>Submit</Button>
      </ButtonWrapper>
    </BoardProvider>
  );
}
