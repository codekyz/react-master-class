import styled from "styled-components";

const Button = styled.button`
  position: absolute;
  top: 40px;
  font-size: 16px;
  padding: 7px 15px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.textColor};
  border: none;
  text-transform: uppercase;
  cursor: pointer;
`;

export default Button;
