import React from "react";
import styled from "styled-components";

const Videos = ({ result, onMedia }) => {
  return (
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
              <a rel="noopener noreferrer" target="_blank" href={`${item.key}`}>
                <Video src={`${item.thumbnail}`} alt="썸네일" />
              </a>
            </Videosbox>
          );
        })}
      </VideosContainer>
    </TextBox>
  );
};
export default Videos;

const TextBox = styled.div`
  margin-top: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 20px;
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
