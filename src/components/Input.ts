import styled from "@emotion/styled";

export const Input = styled.input`
  font-size: 36px;
  padding: 10px;
  background: hsla(0, 0%, 100%, 20%);
  border: none;
  border-radius: 5px;
  text-align: center;

  &:focus {
    outline: none;
  }
`;

export const TopInput = styled(Input)`
  position: absolute;
  top: 0;
  left: calc(var(--board-size) / 2);
  transform: translate(-50%, -110%);
`;

export const BottomInput = styled(Input)`
  position: absolute;
  bottom: 0;
  left: calc(var(--board-size) / 2);
  transform: translate(-50%, 110%) rotate(180deg); ;
`;

export const LeftInput = styled(Input)`
  position: absolute;
  top: calc(var(--board-size) / 2);
  left: 0;
  transform: translate(-60%, -50%) rotate(-90deg);
`;

export const RightInput = styled(Input)`
  position: absolute;
  top: calc(var(--board-size) / 2);
  right: 0;
  transform: translate(60%, -50%) rotate(90deg);
`;
