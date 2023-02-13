import React from "react";
import Card from "@/components/Card";

interface Props {
  words: Array<string>;
}

const Cards = ({ words }: Props) => {
  return (
    <>
      {[0, 1, 2, 3].map((i) => (
        <Card key={i} words={words.slice(i * 4, i * 4 + 4)} />
      ))}
    </>
  );
};

export default React.memo(Cards);
