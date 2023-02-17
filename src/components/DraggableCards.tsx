import React from "react";
import Card from "@/components/DraggableCard";

export interface CardData {
  id: number;
  words: Array<string>;
}

interface Props {
  cardData: Array<CardData>;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

const Cards = ({ cardData, moveCard }: Props) => {
  return (
    <>
      {cardData.map(({ id, words }, index) => (
        <Card
          key={id}
          id={id}
          index={index}
          words={words}
          moveCard={moveCard}
          spare={false}
        />
      ))}
    </>
  );
};

export default React.memo(Cards);
