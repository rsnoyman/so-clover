import React from "react";
import Cards from "@/components/Cards";
import styled from "@emotion/styled";

const Board = styled.div<{ angle: number }>`
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

const TopInputWrapper = styled.div`
  position: absolute;
  top: 0;
  left: calc(var(--board-size) / 2);
  transform: translate(-50%, -100%);
`;

const BottomInputWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: calc(var(--board-size) / 2);
  transform: translate(-50%, 100%) rotate(180deg); ;
`;

const LeftInputWrapper = styled.div`
  position: absolute;
  top: calc(var(--board-size) / 2);
  left: 0;
  transform: translate(-60%, -50%) rotate(-90deg);
`;

const RightInputWrapper = styled.div`
  position: absolute;
  top: calc(var(--board-size) / 2);
  right: 0;
  transform: translate(60%, -50%) rotate(90deg);
`;

const Input = styled.input`
  font-size: 36px;
  padding: 10px;
  margin: 10px;
  background: hsla(0, 0%, 100%, 20%);
  border: none;
  border-radius: 5px;
  text-align: center;

  &:focus {
    outline: none;
  }
`;

const Clover = ({ angle }: { angle: number }) => {
  return (
    <Board angle={angle}>
      <Petal left={1} top={0} />
      <Petal left={0} top={1} />
      <Petal left={2} top={0} />
      <Petal left={0} top={2} />
      <Petal left={1} top={3} />
      <Petal left={3} top={1} />
      <Petal left={2} top={3} />
      <Petal left={3} top={2} />

      <Cards />

      <TopInputWrapper>
        <Input />
      </TopInputWrapper>
      <RightInputWrapper>
        <Input />
      </RightInputWrapper>
      <BottomInputWrapper>
        <Input />
      </BottomInputWrapper>
      <LeftInputWrapper>
        <Input />
      </LeftInputWrapper>
    </Board>
  );
};

export default Clover;
