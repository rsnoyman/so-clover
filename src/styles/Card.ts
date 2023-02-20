import styled from "@emotion/styled";
import { css } from "@emotion/react";

const rotation = (angle: number) => css`
  transform: rotate(${-angle}deg);
`;

export const CardWrapper = styled.div`
  position: relative;
  height: calc(var(--board-size) / 2 - 8px);
  width: calc(var(--board-size) / 2 - 8px);
  border: 3px solid;
  border-radius: 12%;
  z-index: 1;
  margin: 4px;
  overflow: hidden;
`;

type DraggableCardWrapperProps = {
  isHidden: boolean;
  isHighlighted: boolean;
  rotationAngle: number;
};

export const DraggableCardWrapper = styled(
  CardWrapper
)<DraggableCardWrapperProps>`
  border: 3px solid ${({ isHighlighted }) => (isHighlighted ? "white" : null)};
  opacity: ${({ isHidden }) => (isHidden ? 0 : 1)};

  ${({ rotationAngle }) => rotation(rotationAngle)}
`;

export const Pistil = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  inset: 0;
  margin: auto;
  border-radius: 12%;
  box-shadow: 0 0 0 var(--board-size) white;

  border: inherit;
`;

export const Word = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  padding: 10px;

  font-size: 24px;
  text-align: center;
  text-transform: uppercase;

  user-select: none;
`;

export const TopWord = styled(Word)`
  top: 0;
  left: 50%;
  transform: translateX(-50%) rotate(0deg);
`;
export const RightWord = styled(Word)`
  top: 50%;
  right: 0;
  transform: translateY(-50%) rotate(90deg);
`;
export const BottomWord = styled(Word)`
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) rotate(180deg);
`;
export const LeftWord = styled(Word)`
  bottom: 50%;
  left: 0;
  transform: translateY(50%) rotate(270deg);
`;
