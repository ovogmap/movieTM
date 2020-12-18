import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Similar = ({ result }) => {
  return (
    <TextBox>
      <h4>비슷한 영화들</h4>
      <SimilarContainer>
        {result.similars.length === 0 && <p>비슷한 영화가 없습니다..</p>}
        {result.similars.map((item) => {
          return (
            <Link key={item.id} to={`/detail/${item.id}`}>
              <a>
                <SimilarBox>
                  <Similaritem src={`${item.poster_path}`} alt="포스터" />
                  <SimilarTitle>{item.title}</SimilarTitle>
                </SimilarBox>
              </a>
            </Link>
          );
        })}
      </SimilarContainer>
    </TextBox>
  );
};
export default Similar;

const TextBox = styled.div`
  margin-top: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 20px;
`;

const SimilarContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 60px;
  @media ${(props) => props.theme.tablet} {
    flex-direction: row;
    justify-content: space-around;
  }
  @media ${(props) => props.theme.desktop} {
  }
`;

const Similaritem = styled.img`
  border-radius: 10px;
  width: 200px;
  height: 300px;
  box-shadow: 4px 4px 14px 4px #cbcbcb;
`;

const SimilarBox = styled.div`
  margin-top: 20px;
  border-radius: 10px;
  width: 250px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SimilarTitle = styled.h5`
  font-size: 14px;
  padding-top: 20px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media ${(props) => props.theme.tablet} {
    font-size: 16px;
  }
  @media ${(props) => props.theme.desktop} {
    font-size: 20px;
  }
`;
