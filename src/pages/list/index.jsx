import React, { useEffect } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

import ListItem from "../../components/List";
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
  const { upcoming, popular, topRateds, nowplaying } = result;
  return (
    <Layout isColor={true} isMobile={onMedia}>
      <Container>
        <Title>영화 리스트</Title>
        <ListItem itemList={nowplaying} title="상영중인 영화" />
        <ListItem itemList={upcoming} title="개봉예정" />
        <ListItem itemList={popular} title="인기영화" />
        <ListItem itemList={topRateds} title="평점이 좋은 영화" />
      </Container>
    </Layout>
  );
};
export default List;

const Container = styled.div`
  padding-bottom: 40px;
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
