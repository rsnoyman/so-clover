import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
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
  border: 3px solid;
`;

const StyledButtton = styled(Button)`
  width: 200px;
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
}

export default function Lobby({ initialPlayers }: Props) {
  const router = useRouter();
  const { gameId } = router.query;
  const [players, setPlayers] = React.useState(initialPlayers);

  const { data: playersData } = useSWR<Player[]>(
    `/api/get-players?gameId=${gameId}`,
    fetcher,
    // { refreshInterval: 3000 },
  );

  useEffect(() => {
    if (playersData) {
      setPlayers(playersData);
    }
  }, [playersData]);

  const { data: isAdmin } = useSWR<boolean>(`/api/is-admin`, fetcher);

  const [isCopied, setIsCopied] = React.useState(false);
  const [buttonText, setButtonText] = React.useState('Invite');

  const copyPageUrl = async (event: any) => {
    event.preventDefault();

    try {
      await navigator.clipboard.writeText(location.href);
      setIsCopied(true);
    } catch (err) {
      setIsCopied(false);
    }
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
        {isAdmin && <StyledButtton>Start</StyledButtton>}
      </div>
    </Layout>
  );
}
