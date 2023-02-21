import React from 'react';

type BoardContextType = {
  rotationAngle: number;
  handleClockwiseBoardRotate: () => void;
  handleCounterClockwiseBoardRotate: () => void;
  cardData: CardData[] | undefined;
  setCardData: React.Dispatch<React.SetStateAction<CardData[] | undefined>>;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
};

export const BoardContext = React.createContext<BoardContextType>(
  {} as BoardContextType,
);
export interface CardData {
  id: number;
  words: Array<string>;
}

type Props = { children?: React.ReactNode };

const rotateCardData = (cardData: CardData[] | undefined, shift: number) => {
  if (!cardData) return;
  return cardData.map((card, cardIndex) => {
    if (cardIndex === 4) return { ...card };

    return {
      ...card,
      words: card.words.map(
        (x, wordIndex) => card.words[(wordIndex + shift) % 4],
      ),
    };
  });
};

const BoardProvider = ({ children }: Props) => {
  const [cardData, setCardData] = React.useState<CardData[]>();

  const moveCard = React.useCallback(
    (dragIndex: number, hoverIndex: number) => {
      if (!cardData) return;

      const newCardData = [...cardData];

      const tmp = { ...newCardData[dragIndex] };
      newCardData[dragIndex] = newCardData[hoverIndex];
      newCardData[hoverIndex] = tmp;

      setCardData(newCardData);
    },
    [cardData],
  );

  const [rotationAngle, setRotationAngle] = React.useState(0);

  const handleClockwiseBoardRotate = () => {
    setRotationAngle(rotationAngle + 90);

    const newCardData = rotateCardData(cardData, 3);
    setCardData(newCardData);
  };

  const handleCounterClockwiseBoardRotate = () => {
    setRotationAngle(rotationAngle - 90);

    const newCardData = rotateCardData(cardData, 1);
    setCardData(newCardData);
  };

  return (
    <BoardContext.Provider
      value={{
        rotationAngle,
        handleClockwiseBoardRotate,
        handleCounterClockwiseBoardRotate,
        cardData,
        setCardData,
        moveCard,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export default BoardProvider;
