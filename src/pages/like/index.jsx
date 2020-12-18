import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Layout from "../../components/Layout";

const getAllLikes = () => {
  const likes = [];
  for (const [key, value] of Object.entries(localStorage)) {
    if (!Number.isSafeInteger(Number(key))) continue;
    likes.push(JSON.parse(value));
  }
  return likes;
};
const Like = () => {
  const [isLikes, setIsLikes] = useState([]);

  const onDelete = (e) => {
    const { id } = e.target.dataset;
    localStorage.removeItem(id);
    setIsLikes(getAllLikes());
  };
  useEffect(() => {
    setIsLikes(getAllLikes());
  }, []);
  return (
    <Layout isColor={true} isMobile={true}>
      <Container>
        <Title>좋아요 리스트</Title>
        <ListContainer>
          {isLikes &&
            isLikes.map((item) => {
              return (
                <ItemBox key={item.id}>
                  <Link to={`/detail/${item.id}`}>
                    <img
                      src={`${item.poster_path}`}
                      alt=""
                      width="200px"
                      height="300px"
                    />
                    <p>{item.title}</p>
                  </Link>
                  <RemoveBtn data-id={item.id} onClick={onDelete}>
                    좋아요 취소
                  </RemoveBtn>
                </ItemBox>
              );
            })}
          {isLikes.length === 0 && (
            <p style={{ margin: "100px auto" }}>좋아요 리스트가 없습니다</p>
          )}
        </ListContainer>
      </Container>
    </Layout>
  );
};
export default Like;

const Container = styled.div`
  padding-bottom: 40px;
  height: 100vh;
  margin-top: 60px;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  @media ${(props) => props.theme.tablet} {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  @media ${(props) => props.theme.desktop} {
    width: 1180px;
    display: flex;
    flex-direction: column;
  }
`;

const ListContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  @media ${(props) => props.theme.tablet} {
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  @media ${(props) => props.theme.desktop} {
    width: 1180px;
    margin-top: 20px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
`;

const Title = styled.h2`
  margin-top: 20px;
  margin-left: 20px;
`;

const ItemBox = styled.div`
  flex-basis: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 50px;
  p {
    font-weight: 700;
    padding: 10px;
  }
  img {
    border-radius: 10px;
  }
  @media ${(props) => props.theme.mobile} {
    img {
      height: 320px;
      border-radius: 10px;
    }
  }
  @media ${(props) => props.theme.tablet} {
    flex-basis: 33%;
  }
  @media ${(props) => props.theme.desktop} {
    flex-basis: 25%;
  }
`;

const RemoveBtn = styled.button`
  background: #b93b50;
  border: none;
  padding: 5px 10px;
  color: #fff;
  font-weight: 900;
  font-size: 16px;
  border-radius: 5px;
  outline: none;
`;
