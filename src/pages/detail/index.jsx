import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";

import { Intro, Casts, Videos, Similar } from "../../components/Detail";
import ErrorPage from "../404";
import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner";

import theme from "../../styles/media";
import detailApi from "../../common/api/detail";

import { useDispatch, useSelector } from "react-redux";
import { onLoading, getData, onError } from "../../common/modules/detail";

const Detail = ({ match }) => {
  const { id } = match.params;
  const [isLike, setIsLike] = useState(null);
  const { loading, error, result } = useSelector((store) => store.Detail);
  const dispatch = useDispatch();

  const onMedia = useMediaQuery({
    query: theme.tablet,
  });

  const fetchDetailData = async (id) => {
    dispatch(onLoading());
    try {
      const res = await detailApi(id);
      const data = await res;
      console.log("data", data);
      dispatch(getData(data));
    } catch (e) {
      dispatch(onError(e));
    }
  };

  const onLikeToggle = () => {
    const newLike = localStorage.getItem(id) === null;
    if (newLike) {
      localStorage.setItem(
        result.id,
        JSON.stringify({
          id: result.id,
          title: result.title,
          poster_path: result.poster_path,
        })
      );
    } else {
      localStorage.removeItem(id);
    }
    setIsLike(newLike);
  };

  useEffect(() => {
    setIsLike(localStorage.getItem(id) !== null);
    fetchDetailData(id);
  }, [id]);

  if (loading) return <Spinner size={50} color="#645df6" />;
  if (error) return <ErrorPage />;
  return (
    <>
      {!loading && (
        <Layout isMobile={true} isColor={true}>
          <Container>
            <Bg URL={result?.backdrop_path} />
            <Intro
              result={result}
              isLike={isLike}
              onLikeToggle={onLikeToggle}
            />
            <Casts result={result} onMedia={onMedia} />
            <Videos result={result} onMedia={onMedia} />
            <Similar result={result} />
          </Container>
        </Layout>
      )}
    </>
  );
};
export default Detail;

const Bg = styled.div`
  width: 100%;
  height: 400px;
  background: ${(props) => `center / cover no-repeat url(${props.URL})`};
  @media ${(props) => props.theme.desktop} {
    height: 500px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  @media ${(props) => props.theme.tablet} {
    h4 {
      font-size: 30px;
    }
  }
  @media ${(props) => props.theme.desktop} {
    width: 1180px;
    h4 {
      margin-top: 30px;
      font-size: 30px;
    }
  }
`;
