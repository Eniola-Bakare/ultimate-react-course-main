import { styled } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h2" &&
    `
      font-weight: 500;
      font-size: 2rem;
    `}
  ${(props) =>
    props.as === "h3" &&
    `
      font-weight: 500;
      font-size: 2rem;
    `}
${(props) =>
    props.as === "h4" &&
    `
      font-weight: 600;
      text-align: center;
      font-size: 3rem;
    `}
  font-weight: 600;
`;

export default Heading;
