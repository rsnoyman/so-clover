import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { MouseEvent } from 'react';
import useSWR from 'swr';

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

import getCards from '@/utils/api/getCards';
import getCluesSubmitted from '@/utils/api/getCluesSubmitted';
import fetcher from '@/utils/fetcher';

import Button from '@/styles/Button';

const ButtonWrapper = styled.div`
  position: fixed;
  right: 50px;
  bottom: 50px;
`;

interface ServerSideProps {
  cards: Card[];
  cluesSubmitted: boolean;
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (
  context,
) => {
  const playerId = context.req.cookies?.playerId ?? null;
  const cards = playerId ? await getCards(playerId) : [];
  const cluesSubmitted = playerId ? await getCluesSubmitted(playerId) : false;

  return {
    props: { cards, cluesSubmitted },
  };
};

export default function DescribePhase({
  cards,
  cluesSubmitted,
}: ServerSideProps) {
  const router = useRouter();
  const gameId = router.query.gameId as string;

  const [topClue, setTopClue] = React.useState('Enter a clue');
  const [rightClue, setRightClue] = React.useState('');
  const [bottomClue, setBottomClue] = React.useState('');
  const [leftClue, setLeftClue] = React.useState('');

  const [areCluesSubmitted, setAreCluesSubmitted] =
    React.useState(cluesSubmitted);

  const [areAllCluesSubmitted, setAreAllClueSubmitted] = React.useState(false);

  const { data: allCluesSubmitted } = useSWR<boolean>(
    `/api/all-clues-submitted?gameId=${gameId}`,
    fetcher,
    // { refreshInterval: 3000 },
  );

  React.useEffect(() => {
    if (allCluesSubmitted) {
      setAreAllClueSubmitted(allCluesSubmitted);
    }
  }, [allCluesSubmitted]);

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const clues = [topClue, rightClue, bottomClue, leftClue];

    if (clues.some((clue) => !clue)) return; // focus the empty one (?)

    setAreCluesSubmitted(true);

    await fetch(`/api/create-clues?gameId=${gameId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clues }),
    });
  };

  const handleContinue = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    router.push(`/${gameId}/guess`);
  };

  return (
    <BoardProvider>
      <Board>
        <Cards cards={cards} />
        <TopInput
          value={topClue}
          onChange={(event) => {
            setTopClue(event.target.value);
          }}
          disabled={areCluesSubmitted}
        />
        <RightInput
          value={rightClue}
          onChange={(event) => {
            setRightClue(event.target.value);
          }}
          disabled={areCluesSubmitted}
        />
        <BottomInput
          value={bottomClue}
          onChange={(event) => {
            setBottomClue(event.target.value);
          }}
          disabled={areCluesSubmitted}
        />
        <LeftInput
          value={leftClue}
          onChange={(event) => {
            setLeftClue(event.target.value);
          }}
          disabled={areCluesSubmitted}
        />
      </Board>
      <ButtonWrapper>
        {!areCluesSubmitted && <Button onClick={handleSubmit}>Submit</Button>}
        {areAllCluesSubmitted && (
          <Button onClick={handleContinue}>Continue</Button>
        )}
      </ButtonWrapper>
    </BoardProvider>
  );
}
