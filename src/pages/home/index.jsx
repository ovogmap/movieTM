import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import { Link } from "react-router-dom";
import TrendingFlatIcon from "@material-ui/icons/TrendingFlat";

import ErrorPage from "../404";
import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner";

import theme from "../../styles/media";
import introApi from "../../common/api/home";

import { useDispatch, useSelector } from "react-redux";
import { onLoading, getData, onError } from "../../common/modules/home";

const Home = () => {
  const { loading, erorr, result } = useSelector((store) => store.Home);
  const dispatch = useDispatch();
  console.log("result", result);
  const onMedia = useMediaQuery({
    query: theme.tablet,
  });
  const fetchData = async () => {
    dispatch(onLoading());
    try {
      const data = await introApi();
      dispatch(getData(data));
    } catch (e) {
      dispatch(onError(e));
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Spinner size={50} color="#645df6" />;
  if (erorr || result === undefined) return <ErrorPage fetchData={fetchData} />;
  return (
    <>
      <Layout isMobile={false}>
        <Container>
          <ImgBox URL={result?.backdropPath}>
            {!onMedia && <Poster src={`${result?.poster_path}`} />}
            <TextBox>
              <Text title={result}>{result?.title}</Text>
              <Text>{result.tagline || "오늘의 추천영화"}</Text>
              <Join>
                <Link to={`/detail/${result?.id}`}>
                  <a>보러가기</a>
                </Link>
                <TrendingFlatIcon />
              </Join>
            </TextBox>
          </ImgBox>
        </Container>
      </Layout>
    </>
  );
};
export default Home;

const Poster = styled.img`
  width: 180px;
  height: 250px;
  border-radius: 5px;
  box-shadow: 2px 2px 16px 2px #00000094;
`;

const Join = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: none;
  background: none;
  font-size: 18px;
  color: #fff;
  cursor: pointer;
  font-weight: 700;
  outline: none;
  transition: all 0.3s;
  &:hover {
    color: #ff3b3b;
  }
  @media ${(props) => props.theme.tablet} {
    font-size: ${(props) => (props.title ? "36px" : "30px")};
  }
  @media ${(props) => props.theme.desktop} {
    margin: 0 auto;
  }
`;

const Text = styled.p`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #fff;
  font-size: ${(props) => (props.title ? "26px" : "18px")};
  font-weight: ${(props) => (props.title ? "700" : "700")};
  margin-bottom: 20px;
  @media ${(props) => props.theme.tablet} {
    margin-bottom: 30px;
    font-size: ${(props) => (props.title ? "36px" : "30px")};
    font-weight: ${(props) => (props.title ? "700" : "700")};
  }
  @media ${(props) => props.theme.desktop} {
    margin-bottom: 50px;
  }
`;

const ImgBox = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  background: ${(props) => `center / cover no-repeat url(${props.URL})`};
  @media ${(props) => props.theme.desktop} {
    justify-content: center;
  }
`;

const TextBox = styled.div`
  text-align: left;
  background: rgba(58, 55, 55, 0.377);
  width: 100%;
  padding: 20px;
  @media ${(props) => props.theme.desktop} {
    text-align: center;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  @media ${(props) => props.theme.mobile} {
  }
  @media ${(props) => props.theme.tablet} {
  }
  @media ${(props) => props.theme.desktop} {
  }
`;
