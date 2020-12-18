import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import { Link } from "react-router-dom";

import theme from "../../styles/media";
import DehazeIcon from "@material-ui/icons/Dehaze";
import CloseIcon from "@material-ui/icons/Close";

const Navbal = ({ isColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onModea = useMediaQuery({
    query: theme.tablet,
  });
  return (
    <Nav isOpen={isOpen} isColor={isColor}>
      <UL>
        <LI>
          <Link to="/">
            <h1>HOME</h1>
          </Link>
        </LI>
        {onModea ? (
          <LI>
            <SubUL>
              <li>
                <Link to="/list">영화리스트</Link>
              </li>
              <li>
                <Link to="/like">좋아요리스트</Link>
              </li>
              <li>
                <Link to="/search">검색</Link>
              </li>
              <li>
                <Link to="/about">소개</Link>
              </li>
            </SubUL>
          </LI>
        ) : (
          <LI>
            {isOpen ? (
              <CloseIcon
                style={{ color: "#000", zIndex: 5 }}
                onClick={() => {
                  setIsOpen((v) => !v);
                }}
              />
            ) : (
              <DehazeIcon
                onClick={() => {
                  setIsOpen((v) => !v);
                }}
              />
            )}
          </LI>
        )}
      </UL>
      {!onModea && (
        <Navbox
          isOpen={isOpen}
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <ul>
            <li>
              <Link to="/list">영화리스트</Link>
            </li>
            <li>
              <Link to="/like">좋아요리스트</Link>
            </li>
            <li>
              <Link to="/search">검색</Link>
            </li>
            <li>
              <Link to="/about">소개</Link>
            </li>
          </ul>
        </Navbox>
      )}
    </Nav>
  );
};
export default Navbal;
const Nav = styled.nav`
  position: fixed;
  z-index: 2;
  width: 100%;
  color: #fff;
  background: ${(props) => (props.isColor ? "rgba(0, 0, 0, 0.164)" : "none")};
  h1 {
    cursor: pointer;
  }
  @media ${(props) => props.theme.tablet} {
    li {
      a {
        font-size: 20px;
      }
    }
  }
  @media ${(props) => props.theme.desktop} {
    width: 1180px;
    li {
      a {
        font-size: 20px;
        font-weight: 700;
      }
    }
  }
`;
const UL = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 0 15px;
  position: relative;
  z-index: 2;
  @media ${(props) => props.theme.desktop} {
    width: 1180px;
  }
`;
const SubUL = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 15px;
  z-index: 2;
  li {
    margin-left: 30px;
  }
`;
const LI = styled.li``;
const Navbox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(46, 46, 46, 0.596);
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  display: ${(props) => (props.isOpen ? "block" : "none")};
  ul {
    z-index: 1;
    position: absolute;
    top: 0;
    right: 0;
    width: 60%;
    height: 100%;
    background: #fff;
    border-radius: 10px 0 0 10px;
    padding: 40px 30px;
    li {
      margin-top: 10px;
      color: #333;
    }
  }

  @media ${(props) => props.theme.tablet} {
    display: none;
  }
`;
