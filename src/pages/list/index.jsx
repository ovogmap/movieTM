import React, { useEffect } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

import ErrorPage from "../404";
import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner";

import theme from "../../styles/media";
import fetchData from "../../common/api/list";

import { useDispatch, useSelector } from "react-redux";
import { onLoading, getData, onError } from "../../common/modules/list";

const List = () => {
  const { loading, error, result } = useSelector((store) => store.List);
  const dispatch = useDispatch();
  console.log("result", result);

  const onMedia = useMediaQuery({
    query: theme.desktop,
  });

  const fetchListData = async () => {
    dispatch(onLoading());
    try {
      const res = await fetchData();
      dispatch(getData(res));
    } catch (e) {
      dispatch(onError(e));
    }
  };

  useEffect(() => {
    fetchListData();
  }, []);

  if (loading) return <Spinner size={50} color="#645df6" />;
  if (error || result === undefined) return <ErrorPage />;
  return (
    <Layout isColor={true} isMobile={onMedia}>
      <Container>
        <Title>영화 리스트</Title>
        <SubTitle>개봉예정</SubTitle>
        <ItemBox>
          {result.upcoming.map((item) => {
            const { title, id, backdrop_path } = item;
            return (
              <MovieItems>
                <Link to={`/detail/${id}`}>
                  <ItemImg
                    src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
                    alt="사진"
                  />
                  <h4>{title}</h4>
                </Link>
              </MovieItems>
            );
          })}
        </ItemBox>
        <SubTitle>인기영화</SubTitle>
        <ItemBox>
          {result.popular.map((item) => {
            const { title, id, backdrop_path } = item;
            return (
              <MovieItems>
                <Link to={`/detail/${id}`}>
                  <ItemImg
                    src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
                    alt="사진"
                  />
                  <h4>{title}</h4>
                </Link>
              </MovieItems>
            );
          })}
        </ItemBox>
        <SubTitle>평정이 좋은 영화</SubTitle>
        <ItemBox>
          {result.topRateds.map((item) => {
            const { title, id, backdrop_path } = item;
            return (
              <MovieItems>
                <Link to={`/detail/${id}`}>
                  <ItemImg
                    src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
                    alt="사진"
                  />
                  <h4>{title}</h4>
                </Link>
              </MovieItems>
            );
          })}
        </ItemBox>
      </Container>
    </Layout>
  );
};
export default List;

const ItemBox = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 20px;
  @media ${(props) => props.theme.mobile} {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  @media ${(props) => props.theme.tablet} {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  @media ${(props) => props.theme.desktop} {
    display: flex;
    flex-direction: row;
  }
`;

const Container = styled.div`
  padding-bottom: 40px;
  height: 100vh;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    margin-top: 60px;
    display: flex;
    flex-direction: column;
  }
  @media ${(props) => props.theme.tablet} {
    width: 100%;
    margin-top: 60px;
    display: flex;
    flex-direction: column;
  }
  @media ${(props) => props.theme.desktop} {
    width: 1180px;
    margin-top: 60px;
    display: flex;
    flex-direction: column;
  }
`;

const Title = styled.h2`
  margin-top: 20px;
  margin-left: 20px;
`;

const SubTitle = styled.h4`
  padding-bottom: 5px;
  margin-top: 40px;
  margin-left: 20px;
  font-size: 20px;
  display: inline;
  border-bottom: 2px solid #1d0c5c;
  @media ${(props) => props.theme.mobile} {
  }
  @media ${(props) => props.theme.tablet} {
  }
  @media ${(props) => props.theme.desktop} {
  }
`;

const MovieItems = styled.div`
  flex-basis: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 20px;
  &:hover {
    img {
      filter: grayscale(0%);
    }
  }
  @media ${(props) => props.theme.mobile} {
    padding: 0 30px;
    flex-basis: 100%;
    img {
      height: 200px;
      border-radius: 10px;
    }
  }
  @media ${(props) => props.theme.tablet} {
    padding: 0 50px;
    flex-basis: 48%;
    img {
      height: 200px;
      border-radius: 10px;
    }
  }
  @media ${(props) => props.theme.desktop} {
    flex-basis: 24%;
    padding: 0;
    margin: 0;
    img {
      height: 150px;
      border-radius: 10px;
    }
  }
`;

const ItemImg = styled.img`
  border-radius: 10px;
  width: 100%;
  height: 100%;
  @media ${(props) => props.theme.desktop} {
    border-radius: 10px;
    width: 100%;
    height: 100%;
    filter: grayscale(40%);
    transition: all 0.3s;
  }
`;
