import React from "react";
import styled from "styled-components";
import Navbal from "../Navbar";
import Footer from "../Footer";

const Layout = ({ children, isColor, isMobile }) => {
  return (
    <Container>
      <Wrap>
        <Navbal isColor={isColor} />
        {children}
        {isMobile && <Footer />}
      </Wrap>
    </Container>
  );
};
export default Layout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 320px;
  height: 100%;
`;
const Wrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
  @media ${(props) => props.theme.desktop} {
    background: none;
  }
`;
