import React from "react";
import styled from "@emotion/styled";
import useSWRImmutable from "swr/immutable";

const CardWrapper = styled.div`
  position: relative;
  height: calc(var(--board-size) / 2 - 8px);
  width: calc(var(--board-size) / 2 - 8px);
  border-radius: 12%;
  z-index: 1;
  margin: 4px;
  overflow: hidden;
`;

const Pistil = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  inset: 0;
  margin: auto;
  border-radius: 12%;
  box-shadow: 0 0 0 var(--board-size) white;
`;

const Word = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  padding: 10px;

  font-size: 24px;
  text-align: center;
  text-transform: uppercase;

  user-select: none;
`;

const TopWord = styled(Word)`
  top: 0;
  left: 50%;
  transform: translateX(-50%) rotate(0deg);
`;
const RightWord = styled(Word)`
  top: 50%;
  right: 0;
  transform: translateY(-50%) rotate(90deg);
`;
const BottomWord = styled(Word)`
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) rotate(180deg);
`;
const LeftWord = styled(Word)`
  bottom: 50%;
  left: 0;
  transform: translateY(50%) rotate(270deg);
`;

const Card = ({ words }: { words: Array<string> }) => (
  <CardWrapper>
    <Pistil />
    <TopWord>{words[0]}</TopWord>
    <RightWord>{words[1]}</RightWord>
    <BottomWord>{words[2]}</BottomWord>
    <LeftWord>{words[3]}</LeftWord>
  </CardWrapper>
);

async function fetcher(endpoint: string) {
  const response = await fetch(endpoint);
  const json = await response.json();

  return json;
}

const Cards = () => {
  const { data, error, isLoading } = useSWRImmutable("/api/words", fetcher);

  if (isLoading) {
    return <p>Loading…</p>;
  }

  if (error) {
    return <p>Something has gone wrong</p>;
  }

  return (
    <>
      <Card words={data.slice(0, 4)} />
      <Card words={data.slice(4, 8)} />
      <Card words={data.slice(8, 12)} />
      <Card words={data.slice(12, 16)} />
    </>
  );
};

export default React.memo(Cards);
