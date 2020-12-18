import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Error404({ fetchData }) {
  return (
    <Container>
      <ContentBox>
        <Title>404 ERROR</Title>
        <Text>
          The page you looking for might have been removed had its name change
          or is temporarily unavailable
        </Text>
        <Link to="/">
          <A
            onClick={() => {
              fetchData();
            }}
          >
            홈페이지로 돌아가기
          </A>
        </Link>
      </ContentBox>
    </Container>
  );
}
const A = styled.a`
  display: block;
  padding: 18px 40px;
  background: #16447c;
  outline: none;
  border: none;
  color: #fff;
  font-size: 18px;
  border-radius: 50px;
  font-family: "Noto Sans KR";
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background: #002b5e;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  font-family: "Noto Sans KR";
`;
const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
  align-items: center;
`;
const Img = styled.img`
  width: 100%;
`;
const Title = styled.h6`
  color: #ddd;
  margin: 0;
  padding: 50px 0 20px 0;
  font-size: 20px;
  font-weight: 400;
`;
const Text = styled.p`
  color: #ddd;
  padding-bottom: 50px;
  margin: 0;
  text-align: center;
  font-weight: 200;
  font-size: 15px;
  line-height: 1.5;
`;
