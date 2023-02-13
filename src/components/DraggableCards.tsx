import React from "react";
import Card from "@/components/DraggableCard";

export interface CardData {
  id: number;
  words: Array<string>;
}

interface Props {
  cardData: Array<CardData>;
  setCardData: React.Dispatch<React.SetStateAction<CardData[] | undefined>>;
}

const Cards = ({ cardData, setCardData }: Props) => {
  const moveCard = React.useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const newCardData = [...cardData];

      const tmp = newCardData[dragIndex];
      newCardData[dragIndex] = newCardData[hoverIndex];
      newCardData[hoverIndex] = tmp;

      setCardData(newCardData);
    },
    [cardData, setCardData]
  );

  return (
    <>
      {cardData.map(({ id, words }, index) => (
        <Card
          key={id}
          id={id}
          index={index}
          words={words}
          moveCard={moveCard}
        />
      ))}
    </>
  );
};

export default React.memo(Cards);
