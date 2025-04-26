import SideBar from "../Components/SideBar";
import Main from "../Components/Main";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const Chat = () => {
  return (
    <Container>
      <SideBar />
      <Main />
    </Container>
  );
};

export default Chat;
