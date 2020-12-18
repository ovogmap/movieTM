import React from "react";
import styled from "styled-components";
import Layout from "../../components/Layout";

const About = () => {
  return (
    <Layout isColor={true} isMobile={true}>
      <Container>
        <h2>소개글</h2>
        <TextBox>
          <p>
            안녕하세요! <br />
            TMDB OPEN API와 React를 사용해 만들어본 <br />
            반응형 영화소개 웹앱입니다. <br />
            Styled-components를 기반으로 Css-in-Js 기법을사용해 스타일링하였고,
            <br />
            React-Router를 사용해 페이지 이동을 구현했습니다. <br />
            Redux를 사용해 상태관리를 하였습니다. 감사합니다. <br />
          </p>
        </TextBox>
      </Container>
    </Layout>
  );
};
export default About;

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 60px;
  padding: 20px;
  @media ${(props) => props.theme.desktop} {
    width: 1180px;
  }
`;
const TextBox = styled.div`
  margin-top: 20px;
  @media ${(props) => props.theme.mobile} {
    p {
      font-size: 14px;
    }
  }
  @media ${(props) => props.theme.tablet} {
    p {
      font-size: 16px;
    }
  }
  @media ${(props) => props.theme.desktop} {
    p {
      font-size: 20px;
    }
  }
`;
