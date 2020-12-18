import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

import ErrorPage from "../404";
import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner";

import theme from "../../styles/media";
import detailApi from "../../common/api/detail";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import { onLoading, getData, onError } from "../../common/modules/detail";

const Detail = ({ match }) => {
  const { id } = match.params;
  const [isLike, setIsLike] = useState(null);
  const { loading, error, result } = useSelector((store) => store.Detail);
  const dispatch = useDispatch();
  console.log("result", result);
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
  useEffect(() => {
    setIsLike(localStorage.getItem(id) !== null);
    fetchDetailData(id);
  }, [id]);
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
  if (loading) return <Spinner size={50} color="#645df6" />;
  if (error) return <ErrorPage />;
  return (
    <>
      {!loading && (
        <Layout isMobile={true} isColor={true}>
          <Container>
            <Bg URL={result?.backdrop_path} />
            <IntroBox>
              <Poster src={`${result.poster_path}`} />
              <SubBox>
                <ColumnF>
                  <Title>{result.title}</Title>
                  <SubTitleBox>
                    <Gens>{result.gens}</Gens>
                    <Gens>{result.runtime}분</Gens>
                  </SubTitleBox>
                  <ReactStars
                    size={24}
                    count={5}
                    activeColor="#ffd700"
                    value={Math.round(result.vote_average / 2)}
                    edit={false}
                  />
                  <LikeBox>
                    {isLike && (
                      <FavoriteIcon
                        style={{ cursor: "pointer" }}
                        onClick={onLikeToggle}
                        htmlColor="#ff7272"
                      />
                    )}
                    {!isLike && (
                      <FavoriteBorderIcon
                        style={{ cursor: "pointer" }}
                        onClick={onLikeToggle}
                        htmlColor="#ff7272"
                      />
                    )}
                  </LikeBox>
                </ColumnF>
                <ColumnF>
                  <Tagline>{result.tagline}</Tagline>
                </ColumnF>
              </SubBox>
            </IntroBox>
            <TextBox>
              <h4>줄거리</h4>
              <OverView>{result.overview || "줄거리가 없습니다.."}</OverView>
            </TextBox>
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
            <TextBox>
              <h4>예고편</h4>
              <VideosContainer>
                {result.videos.length === 0 && <p>예고편이 없습니다..</p>}
                {result.videos.map((item, i) => {
                  if (!onMedia) {
                    if (i > 1) return null;
                  }
                  return (
                    <Videosbox key={item.key}>
                      <a
                        rel="noopener noreferrer"
                        target="_blank"
                        href={`${item.key}`}
                      >
                        <Video src={`${item.thumbnail}`} alt="썸네일" />
                      </a>
                    </Videosbox>
                  );
                })}
              </VideosContainer>
            </TextBox>
            <TextBox>
              <h4>비슷한 영화들</h4>
              <SimilarContainer>
                {result.similars.length === 0 && (
                  <p>비슷한 영화가 없습니다..</p>
                )}
                {result.similars.map((item) => {
                  return (
                    <Link key={item.id} to={`/detail/${item.id}`}>
                      <a>
                        <SimilarBox>
                          <Similaritem
                            src={`${item.poster_path}`}
                            alt="포스터"
                          />
                          <SimilarTitle>{item.title}</SimilarTitle>
                        </SimilarBox>
                      </a>
                    </Link>
                  );
                })}
              </SimilarContainer>
            </TextBox>
          </Container>
        </Layout>
      )}
    </>
  );
};
export default Detail;

const LikeBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  margin-top: 5px;
`;

const ColumnF = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media ${(props) => props.theme.desktop} {
    flex-direction: row;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    h2 {
      margin: 0 10px 0 0;
    }
    p {
      margin: 0 10px 0 0;
      padding: 0;
    }
  }
`;

const SubBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media ${(props) => props.theme.desktop} {
    padding: 20px;
    padding-left: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
`;

const IntroBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media ${(props) => props.theme.desktop} {
    flex-direction: row;
    display: flex;
    width: 1000px;
    justify-content: flex-start;
  }
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

const VideosContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 100%;
  @media ${(props) => props.theme.tablet} {
    flex-direction: row;
    justify-content: space-around;
  }
  @media ${(props) => props.theme.desktop} {
  }
`;
const Videosbox = styled.div`
  margin-top: 10px;
`;

const Video = styled.img`
  border-radius: 10px;
  width: 100%;
  height: 200px;
  @media ${(props) => props.theme.tablet} {
    width: 250px;
    height: 150px;
  }
  @media ${(props) => props.theme.desktop} {
    width: 320px;
    height: 200px;
  }
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

const SubTitleBox = styled.div`
  display: flex;
  flex: 1;
`;

const Title = styled.h2`
  margin-top: 20px;
`;
const Tagline = styled.p`
  padding: 0 20px;
  margin-top: 10px;
  font-size: 20px;
  font-weight: 400;
`;
const Gens = styled.p`
  margin-top: 10px;
  font-size: 12px;
  margin-left: 10px;
`;
const OverView = styled.p`
  display: inline-block;
  margin-top: 15px;
  width: 100%;
  overflow: hidden;
  white-space: wrap;
  text-overflow: ellipsis;
`;

const Poster = styled.img`
  margin-top: -150px;
  width: 180px;
  height: 250px;
  border-radius: 5px;
  box-shadow: 2px 2px 16px 2px #00000094;
  @media ${(props) => props.theme.desktop} {
    width: 220px;
    height: 290px;
  }
`;

const Bg = styled.div`
  /* position: fixed; */
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
const TextBox = styled.div`
  margin-top: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 20px;
`;
