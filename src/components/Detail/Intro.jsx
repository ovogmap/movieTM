import React from "react";
import styled from "styled-components";
import ReactStars from "react-rating-stars-component";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const Intro = ({ result, isLike, onLikeToggle }) => {
  if (!result) return null;
  return (
    <>
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
    </>
  );
};
export default Intro;

const OverView = styled.p`
  display: inline-block;
  margin-top: 15px;
  width: 100%;
  overflow: hidden;
  white-space: wrap;
  text-overflow: ellipsis;
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

const Tagline = styled.p`
  padding: 0 20px;
  margin-top: 10px;
  font-size: 20px;
  font-weight: 400;
`;

const LikeBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  margin-top: 5px;
`;

const Gens = styled.p`
  margin-top: 10px;
  font-size: 12px;
  margin-left: 10px;
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

const SubTitleBox = styled.div`
  display: flex;
  flex: 1;
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

const Title = styled.h2`
  margin-top: 20px;
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
