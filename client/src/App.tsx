import "./App.css";
import styled from "styled-components";
import SideBar from "./Components/SideBar";
import Main from "./Components/Main";

const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

function App() {
  return (
    <Container>
      <SideBar />
      <Main />
    </Container>
  );
}

export default App;
