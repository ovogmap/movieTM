import React from "react";
import styled from "styled-components";
import MoonLoader from "react-spinners/MoonLoader";

const Spinner = ({ size, color }) => {
  return (
    <Container>
      <MoonLoader size={size} color={color} />
    </Container>
  );
};
export default Spinner;
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
