import React from "react";
import Card from "@/components/DraggableCard";
import { CardData } from "@/components/DraggableCards";

interface Props {
  cardData: CardData;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

const DraggableSpareCard = ({ cardData: { id, words }, moveCard }: Props) => (
  <Card id={id} index={-1} words={words} moveCard={moveCard} spare />
);

export default DraggableSpareCard;
