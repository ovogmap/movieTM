import React from "react";
import styled from "styled-components";

const Casts = ({ result, onMedia }) => {
  return (
    <TextBox>
      <h4>등장인물</h4>
      <CastContainer>
        {result.casts.map((item, i) => {
          if (!onMedia) {
            if (i > 2) return null;
          }
          return (
            <CastBox key={item.name}>
              <CastsImg src={`${item.profile_path}`} alt="사진" />
              <CastsName>{item.name}</CastsName>
              <CastsCha>{item.character} 역</CastsCha>
            </CastBox>
          );
        })}
      </CastContainer>
    </TextBox>
  );
};
export default Casts;

const TextBox = styled.div`
  margin-top: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 20px;
`;

const CastContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin-top: 20px;
`;

const CastBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const CastsImg = styled.img`
  width: 80px;
  height: 130px;
  border-radius: 10px;
  box-shadow: 4px 4px 14px 4px #cbcbcb;
  @media ${(props) => props.theme.tablet} {
    width: 100px;
    height: 150px;
  }
  @media ${(props) => props.theme.desktop} {
    width: 150px;
    height: 200px;
  }
`;

const CastsName = styled.h5`
  width: 100px;
  text-align: center;
  font-size: 12px;
  padding: 20px 0 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
  @media ${(props) => props.theme.tablet} {
    font-size: 12px;
  }
  @media ${(props) => props.theme.desktop} {
    font-size: 16px;
    width: 200px;
  }
`;

const CastsCha = styled.p`
  font-size: 10px;
  width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
  text-align: center;
  @media ${(props) => props.theme.tablet} {
    font-size: 10px;
  }
  @media ${(props) => props.theme.desktop} {
    font-size: 14px;
    width: 200px;
    white-space: wrap;
  }
`;
