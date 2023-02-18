import React from "react";
import Card from "@/components/DraggableCard";
import { CardData } from "@/components/DraggableCards";

interface Props {
  cardData: CardData;
}

const DraggableSpareCard = ({ cardData: { id, words } }: Props) => (
  <Card id={id} index={4} words={words} />
);

export default DraggableSpareCard;
