import React from 'react';

import {
  BottomWord,
  CardWrapper,
  LeftWord,
  Pistil,
  RightWord,
  TopWord,
} from '@/styles/Card';

interface Props {
  words: Array<string>;
}

const Card = ({ words }: Props) => (
  <CardWrapper>
    <Pistil />
    <TopWord>{words[0]}</TopWord>
    <RightWord>{words[1]}</RightWord>
    <BottomWord>{words[2]}</BottomWord>
    <LeftWord>{words[3]}</LeftWord>
  </CardWrapper>
);

export default Card;
