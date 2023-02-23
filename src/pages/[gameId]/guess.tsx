import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { MouseEvent } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styled from '@emotion/styled';
import { Clue, Player } from '@prisma/client';

import Board from '@/components/Board';
import { BoardContext } from '@/components/BoardProvider';
import Cards from '@/components/DraggableCards';
import SpareCard from '@/components/DraggableSpareCard';
import {
  BottomInput,
  LeftInput,
  RightInput,
  TopInput,
} from '@/components/Input';

import getAllCards, { CardData } from '@/utils/api/getAllCards';
import getAllClues from '@/utils/api/getAllClues';
import getAllPlayers from '@/utils/api/getAllPlayers';

import Button from '@/styles/Button';

const SparePile = styled.div`
  position: fixed;
  left: 50px;
  bottom: 50px;
`;

const StyledButton = styled(Button)`
  width: 200px;
`;
const ButtonWrapper = styled.div`
  position: fixed;
  right: 50px;
  bottom: 50px;
`;

interface CluesProps {
  clues: Clue[];
}
const Clues = ({ clues }: CluesProps) => {
  const [top, right, bottom, left] = clues.sort(
    (a, b) => a.position - b.position,
  );
  return (
    <>
      <TopInput value={top.clue} disabled />
      <RightInput value={right.clue} disabled />
      <BottomInput value={bottom.clue} disabled />
      <LeftInput value={left.clue} disabled />
    </>
  );
};

interface ServerSideProps {
  allCards: CardData[];
  allClues: Clue[];
  allPlayers: Player[];
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (
  context,
) => {
  const gameId = context.query.gameId as string;

  const allCards = await getAllCards(gameId);
  const allClues = await getAllClues(gameId);
  const allPlayers = await getAllPlayers(gameId);

  return {
    props: { allCards, allClues, allPlayers },
  };
};

export default function GuessPhase({
  allCards,
  allClues,
  allPlayers,
}: ServerSideProps) {
  const [playerNumber, setPlayerNumber] = React.useState(0);
  const [isChecked, setIsChecked] = React.useState(0);
  const [correctCards, setCorrectCards] = React.useState<boolean[]>([]);
  const { cardData, setCardData, rotationAngle } =
    React.useContext(BoardContext);
  const router = useRouter();

  const player = allPlayers[playerNumber];
  const gameCompleted = allPlayers.length === playerNumber;

  const cards = React.useMemo(
    () => allCards.filter((card) => card.playerId === player.id),
    [allCards, player.id],
  );

  React.useEffect(() => {
    setCardData(cards);
  }, [cards, setCardData]);

  const clues = allClues.filter((clue) => clue.playerId === player.id);

  const handleContinue = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setPlayerNumber(playerNumber + 1);
    setCorrectCards([]);
    setIsChecked(0);
  };

  const handleCheck = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const res = await fetch(`/api/check-guess?playerId=${player.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ guess: cardData, rotation: rotationAngle }),
    });

    const correctCards = await res.json();
    setCorrectCards(correctCards);
    setIsChecked(isChecked + 1);
  };

  const handleGameOver = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    router.push('/');
  };

  const correctFirstTime = isChecked === 1 && correctCards.every((x) => x);

  return (
    cardData.length !== 0 && (
      <DndProvider backend={HTML5Backend}>
        <Board>
          <Cards cards={cardData.slice(0, 4)} correctCards={correctCards} />
          <Clues clues={clues} />
        </Board>
        <SparePile>
          <SpareCard card={cardData[4]} />
        </SparePile>
        <ButtonWrapper>
          {isChecked === 2 || correctFirstTime ? (
            gameCompleted ? (
              <StyledButton onClick={handleGameOver}>New Game</StyledButton>
            ) : (
              <StyledButton onClick={handleContinue}>Continue</StyledButton>
            )
          ) : (
            <StyledButton onClick={handleCheck}>Check</StyledButton>
          )}
        </ButtonWrapper>
      </DndProvider>
    )
  );
}
