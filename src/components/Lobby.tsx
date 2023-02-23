import { useRouter } from 'next/router';
import React, { MouseEvent } from 'react';
import useSWR from 'swr';

import styled from '@emotion/styled';
import { Player } from '@prisma/client';

import fetcher from '@/utils/fetcher';

import Button from '@/styles/Button';

const Layout = styled.form`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  height: var(--board-size);
  width: var(--board-size);
  inset: 0;
  margin: auto;
`;

const StyledButtton = styled(Button)`
  width: 300px;
`;

const PlayersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`;

const PlayerWrapper = styled.div`
  text-transform: uppercase;
`;

interface Props {
  initialPlayers: Player[];
  isAdmin: boolean;
}

export default function Lobby({ initialPlayers, isAdmin }: Props) {
  const router = useRouter();
  const gameId = router.query.gameId as string;
  console.log(router.query);
  const [players, setPlayers] = React.useState(initialPlayers);
  const [isGameReady, setIsGameReady] = React.useState(false);

  const { data: playersData } = useSWR<Player[]>(
    `/api/get-players?gameId=${gameId}`,
    fetcher,
    // { refreshInterval: 3000 },
  );

  React.useEffect(() => {
    if (playersData) {
      setPlayers(playersData);
    }
  }, [playersData]);

  const { data: gameReady } = useSWR<boolean>(
    `/api/describe-started?gameId=${gameId}`,
    fetcher,
    // { refreshInterval: 3000 },
  );

  React.useEffect(() => {
    if (gameReady) {
      setIsGameReady(gameReady);
    }
  }, [gameReady]);

  const [isCopied, setIsCopied] = React.useState(false);
  const [buttonText, setButtonText] = React.useState('Invite');

  const copyPageUrl = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      await navigator.clipboard.writeText(location.href);
      setIsCopied(true);
    } catch (err) {
      setIsCopied(false);
    }
  };

  const handleCreate = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (players.length > 20) {
      return;
    }

    const describeStarted = await fetcher(
      `/api/generate-words?gameId=${gameId}`,
    );

    setIsGameReady(describeStarted);
  };

  const handleStart = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    router.push(`/${gameId}/describe`);
  };

  return (
    <Layout>
      <PlayersWrapper>
        <h1>Players</h1>
        {players.map(({ id, name }) => (
          <PlayerWrapper key={id}>{name}</PlayerWrapper>
        ))}
      </PlayersWrapper>
      <div>
        <StyledButtton
          onClick={copyPageUrl}
          onMouseOver={() => {
            setButtonText('Copy');
          }}
          onMouseUp={() => {
            setButtonText(isCopied ? 'Copied' : 'Copy');
          }}
          onMouseLeave={() => {
            setButtonText('Invite');
          }}
        >
          {buttonText}
        </StyledButtton>
        {isGameReady ? (
          <StyledButtton onClick={handleStart}>Start Game</StyledButtton>
        ) : (
          isAdmin && (
            <StyledButtton onClick={handleCreate}>Create Game</StyledButtton>
          )
        )}
      </div>
    </Layout>
  );
}
