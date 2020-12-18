import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const ListItem = ({ itemList, title }) => {
  console.log(itemList);
  return (
    <>
      <IntroBox>
        <SubTitle>{title}</SubTitle>
        <MoreBox>
          <More>더보기</More>
          <ArrowForwardIosIcon />
        </MoreBox>
      </IntroBox>
      <ItemBox>
        {itemList.map((item) => {
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
    </>
  );
};
export default ListItem;

const MoreBox = styled.div`
  display: flex;
  cursor: pointer;
`;

const More = styled.span`
  font-size: 16px;
  font-weight: 700;
`;

const IntroBox = styled.div`
  margin-top: 40px;
  width: 100%;
  padding: 20px 20px 10px 20px;
  display: flex;
  justify-content: space-between;
  @media ${(props) => props.theme.tablet} {
    padding: 20px 50px 10px 50px;
  }
`;
const SubTitle = styled.h4`
  font-size: 20px;
  display: inline;
`;

const ItemBox = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 20px;
  width: 100%;
  @media ${(props) => props.theme.mobile} {
    justify-content: space-between;
  }
  @media ${(props) => props.theme.tablet} {
    justify-content: space-around;
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
    filter: grayscale(40%);
    transition: all 0.3s;
  }
`;
