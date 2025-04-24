import { useState } from "react";
import styled from "styled-components";
import { Settings } from "lucide-react";
import db from "../assets/db.json";

interface User {
  id: string;
  name: string;
  avatar: string;
  status: string;
}

const Container = styled.aside`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #101929;
  color: white;
  overflow: hidden;
`;

const Header = styled.header`
  font-size: 1.4rem;
  font-weight: 600;
  width: 100%;
`;

const SearchBar = styled.input`
  cursor: pointer;
  margin-top: 10px;
  border: none;
  outline: none;
  padding: 10px;
  height: 30px;
  width: 100%;
  border-radius: 8px;
  background-color: #030e1f;
  color: #fff;

  &:focus {
    border: 1px solid #3362ef;
  }
`;

const Users = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const User = styled.div<{ $isActive: boolean }>`
  margin-top: 10px;
  display: flex;
  align-items: center;
  height: 60px;
  width: 100%;
  gap: 10px;
  padding: 5px;
  background-color: ${({ $isActive }) => ($isActive ? "#1c283e" : "#101929")};
  border-radius: ${({ $isActive }) => ($isActive ? "8px" : "0px")};
  img {
    border-radius: 50%;
    height: 40px;
    width: 40px;
    object-fit: cover;
  }

  &:hover {
    background-color: #1e2738;
    border-radius: 8px;
  }
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;

  h5 {
    font-weight: 200;
  }

  h6 {
    font-weight: 100;
  }
`;

// const Time = styled.p``;

const Profile = styled.div`
  padding: 5px 25px;
  border-radius: 12px;
  background-color: #030e1f;
  margin-top: auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    border-radius: 50%;
    width: 30px;
    height: 30px;
  }
`;

const SideBar = () => {
  // const [open, setOpen] = useState(false);
  const [users] = useState<User[]>(db);
  const [activeUserId, setActiveUserId] = useState<string | null>(null);

  console.log(users);

  return (
    <Container>
      <Header>Unichat</Header>
      <SearchBar placeholder="Search..." />
      <Users>
        <h2>Messages</h2>
        {users.map((user: User) => {
          return (
            <User
              key={user.id}
              $isActive={user.id === activeUserId}
              onClick={() => setActiveUserId(user.id)}
            >
              <img src={user.avatar} alt="avatar" />
              <TextContent>
                <h5>{user.name}</h5>
                <h6>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </h6>
              </TextContent>
            </User>
          );
        })}
      </Users>

      <Profile>
        <img
          src="https://api.dicebear.com/7.x/initials/svg?seed=John%20Doe"
          alt="avatar"
        />
        <p>Jon Snow</p>
        <Settings />
      </Profile>
    </Container>
  );
};

export default SideBar;
