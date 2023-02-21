import React from 'react';

import styled from '@emotion/styled';

import { BoardContext } from '@/components/BoardProvider';

const Base = styled.div<{ angle: number }>`
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  height: var(--board-size);
  width: var(--board-size);
  inset: 0;
  margin: auto;

  background: var(--clover-color);
  border-radius: 7%;

  transform: rotate(${({ angle }) => angle}deg);
  transition: transform 750ms ease;
`;

const Petal = styled.div<{ left: number; top: number }>`
  position: absolute;
  background: hsl(87, 100%, 40%);
  height: calc(var(--board-size) / 2.3);
  width: calc(var(--board-size) / 2.3);
  border-radius: 50%;

  top: calc(${({ top }) => top}*var(--board-size) / 3);
  left: calc(${({ left }) => left}*var(--board-size) / 3);
  transform: translate(-50%, -50%);
`;

interface Props {
  children?: React.ReactNode;
}

const Clover = ({ children }: Props) => {
  const { rotationAngle } = React.useContext(BoardContext);

  return (
    <Base angle={rotationAngle}>
      <Petal left={1} top={0} />
      <Petal left={0} top={1} />
      <Petal left={2} top={0} />
      <Petal left={0} top={2} />
      <Petal left={1} top={3} />
      <Petal left={3} top={1} />
      <Petal left={2} top={3} />
      <Petal left={3} top={2} />
      {children}
    </Base>
  );
};

export default Clover;
