import { useRouter } from 'next/router';
import React, { FormEvent } from 'react';
import { useCookies } from 'react-cookie';

import styled from '@emotion/styled';
import { Player } from '@prisma/client';

import { NameInput } from '@/components/Input';

import fetcher from '@/utils/fetcher';

import Button from '@/styles/Button';

const Form = styled.form`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
  height: var(--board-size);
  width: var(--board-size);
  inset: 0;
  margin: auto;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin: 4px;
`;

const createPlayer = async (
  gameId: string,
  name: string,
  admin: boolean,
): Promise<Player> => {
  const response = await fetch(`/api/create-player?gameId=${gameId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, admin }),
  });

  const player = await response.json();

  return player;
};

interface Props {
  setPlayers?: React.Dispatch<React.SetStateAction<Player[]>>;
  setPlayerId?: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function NewPlayerForm({ setPlayers, setPlayerId }: Props) {
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState(false);
  const [started, setStarted] = React.useState(false);

  const [, setCookie] = useCookies(['playerId']);

  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStarted(true);

    if (!name) {
      setError(true);
      setStarted(false);
      return;
    }

    let gameId = router.query?.gameId as string;
    const newGame = !gameId;

    if (newGame) {
      gameId = await fetcher('/api/create-game');
    }

    const player = await createPlayer(gameId, name, newGame);

    setPlayers && setPlayers((players) => [...players, player]);
    setPlayerId && setPlayerId(player.id);
    setCookie('playerId', player.id, {
      path: '/',
      maxAge: 7200 /* Expires after 2hr */,
    });

    if (newGame) {
      router.push(gameId);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>🍀 So Clover! 🍀</h1>
      <InputWrapper>
        <Label htmlFor="name">Enter Your Name</Label>
        <NameInput
          id="name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        {error && <div>Please enter your name</div>}
      </InputWrapper>
      <Button type="submit" disabled={started}>
        {started ? 'Loading' : 'Start'}
      </Button>
    </Form>
  );
}
