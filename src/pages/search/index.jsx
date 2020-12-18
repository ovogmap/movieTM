import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Layout from "../../components/Layout";

import getSearchMovie from "../../common/api/serach";

const Search = () => {
  const [onSearch, setOnSearch] = useState("");
  const [getQuery, setGetQuery] = useState(null);
  const serachRun = async () => {
    const movie = onSearch;
    const response = await getSearchMovie(movie);
    setGetQuery(response.data?.results);
  };
  const onChange = (e) => {
    const { value } = e.target;
    setOnSearch(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    serachRun();
  };
  return (
    <Layout isColor={true} isMobile={true}>
      <Container>
        <IntroTitle>
          <h2>검색</h2>
        </IntroTitle>
        <form onSubmit={onSubmit}>
          <Input
            type="text"
            placeholder="검색할 영화제목을 입력후 엔터를 눌러주세요."
            onChange={onChange}
            value={onSearch}
          />
        </form>
        <ResultBox>
          {getQuery &&
            getQuery.map((item, i) => {
              return (
                <Link key={i} to={`/detail/${item.id}`}>
                  {item.title}
                </Link>
              );
            })}
        </ResultBox>
      </Container>
    </Layout>
  );
};
export default Search;

const ResultBox = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  a {
    padding: 0 20px;
    display: block;
    margin-top: 20px;
  }
  span {
    margin-left: 40px;
    font-size: 16px;
  }
  @media ${(props) => props.theme.desktop} {
    width: 1180px;
  }
`;
const IntroTitle = styled.div`
  margin-bottom: 30px;
`;
const Input = styled.input`
  width: 100%;
  height: 50px;
  background: #eee;
  padding: 0 20px;
  font-weight: 700;
  border: none;
  transition: all 0.8s;
  outline: none;
  &:focus {
    border-radius: 50px;
    background: #fcfcfc;
  }
`;
