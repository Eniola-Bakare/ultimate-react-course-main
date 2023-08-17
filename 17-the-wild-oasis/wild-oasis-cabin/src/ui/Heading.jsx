import { styled } from "styled-components";

const Heading = styled.h1`
  ${(props) => props.as === "h1" && `font-size: 20px;`}
  ${(props) => props.as === "h2" && `font-size: 30px; `}
${(props) => props.as === "h3" && `font-size: 10px; `}
  font-weight: 600;
`;

export default Heading;
