import styled from '@emotion/styled';

const RotateButton = styled.button<{ left?: boolean }>`
  position: fixed;
  top: 50px;
  background: none;
  border: none;
  ${({ left }) =>
    left
      ? `left: 20%;
  transform: translate(-50%, 0);`
      : `right: 20%;
  transform: translate(50%, 0);`}
`;

export default RotateButton;
