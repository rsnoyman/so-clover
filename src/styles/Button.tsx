import styled from '@emotion/styled';

const Button = styled.button`
  display: inline-block;
  font-size: 2em;
  padding: 0.35em 1.2em;
  border: 0.1em solid black;
  margin: 0 0.3em 0.3em 0;
  border-radius: 0.3em;
  box-sizing: border-box;
  background: none;
  text-decoration: none;
  font-weight: 300;
  color: black;
  text-align: center;
  transition: all 0.2s;

  &:hover {
    background-color: #ffffff;
  }
`;

export default Button;
