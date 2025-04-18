import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Send } from "lucide-react";

type ChatMessage = {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
};

const Container = styled.main`
  flex: 6;
  font-size: 1.3rem;
  background-color: #030e1f;
  color: white;
  padding: 10px;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const TopBar = styled.div`
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #fff;
`;

const User = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  p {
    font-size: 1rem;
  }
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Chat = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-top: 20px;
  padding-bottom: 70px; // Make space for the input bar
`;

const ChatBubble = styled.div<{ $msg: ChatMessage }>`
  display: flex;
  justify-content: ${({ $msg }) =>
    $msg.senderId === currentUserId ? "flex-end" : "flex-start"};
  margin-bottom: 0.5rem;

  div {
    background-color: ${({ $msg }) =>
      $msg.senderId === currentUserId ? "#444a5e" : "#5c6bc0"};
    padding: 0.75rem;
    border-radius: 1rem;
    max-width: 60%;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
`;

const MessageBar = styled.div`
  background-color: #101929;
  border-radius: 12px;
  padding: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  position: sticky;
  bottom: 0;
  background-color: #101929;
  z-index: 10; // Keeps it above the chat history

  input {
    width: 90%;
    height: 30px;
    padding: 20px;
    border: none;
    outline: none;
    border-radius: 8px;
    background-color: #101929;
    color: white;
  }

  button {
    width: 50px;
    height: 50px;
    background-color: transparent;
    border: none;
    outline: none;
    color: white;
    cursor: pointer;
    background-color: #5c6bc0;
    border-radius: 50%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const currentUserId: string = "user_123"; // Replace this later with actual user ID

const dummyMessages: ChatMessage[] = [
  {
    id: "1",
    text: "Hey! How's everything going?",
    senderId: "user_123",
    timestamp: "2025-04-15T09:01:00Z",
  },
  {
    id: "2",
    text: "Pretty good actually, just working on the new feature you mentioned.",
    senderId: "user_456",
    timestamp: "2025-04-15T09:02:12Z",
  },
  {
    id: "3",
    text: "Nice! Let me know if you get stuck anywhere.",
    senderId: "user_123",
    timestamp: "2025-04-15T09:03:05Z",
  },
  {
    id: "4",
    text: "Will do. Also, did you check out the latest design updates?",
    senderId: "user_456",
    timestamp: "2025-04-15T09:04:00Z",
  },
  {
    id: "5",
    text: "Not yet, but I’ll review them in the evening.",
    senderId: "user_123",
    timestamp: "2025-04-15T09:05:42Z",
  },
  {
    id: "6",
    text: "Cool, no rush. Just wanted your thoughts on the layout.",
    senderId: "user_456",
    timestamp: "2025-04-15T09:06:31Z",
  },
  {
    id: "7",
    text: "Sure thing. I like the new color scheme so far.",
    senderId: "user_123",
    timestamp: "2025-04-15T09:07:10Z",
  },
  {
    id: "8",
    text: "Thanks! I was worried it might be too bold.",
    senderId: "user_456",
    timestamp: "2025-04-15T09:08:02Z",
  },
  {
    id: "9",
    text: "Not at all. It's clean and fresh. Modern vibe.",
    senderId: "user_123",
    timestamp: "2025-04-15T09:08:45Z",
  },
  {
    id: "10",
    text: "Appreciate that. Should we push to staging later?",
    senderId: "user_456",
    timestamp: "2025-04-15T09:09:20Z",
  },
  {
    id: "11",
    text: "Yeah, after I merge a couple of PRs.",
    senderId: "user_123",
    timestamp: "2025-04-15T09:10:05Z",
  },
  {
    id: "12",
    text: "Cool, ping me when you're done.",
    senderId: "user_456",
    timestamp: "2025-04-15T09:11:01Z",
  },
  {
    id: "13",
    text: "By the way, did the client respond?",
    senderId: "user_123",
    timestamp: "2025-04-15T09:12:15Z",
  },
  {
    id: "14",
    text: "Yeah, they asked for a quick call tomorrow.",
    senderId: "user_456",
    timestamp: "2025-04-15T09:13:29Z",
  },
  {
    id: "15",
    text: "Okay, I’ll block 10AM for that.",
    senderId: "user_123",
    timestamp: "2025-04-15T09:14:10Z",
  },
  {
    id: "16",
    text: "Sounds good. I’ll send out the invite.",
    senderId: "user_456",
    timestamp: "2025-04-15T09:14:50Z",
  },
  {
    id: "17",
    text: "Thanks. Let’s make sure the demo is smooth.",
    senderId: "user_123",
    timestamp: "2025-04-15T09:15:40Z",
  },
  {
    id: "18",
    text: "Yup. I’ll run it once more tonight just in case.",
    senderId: "user_456",
    timestamp: "2025-04-15T09:16:23Z",
  },
  {
    id: "19",
    text: "Appreciate that. We’re almost there.",
    senderId: "user_123",
    timestamp: "2025-04-15T09:17:01Z",
  },
  {
    id: "20",
    text: "Yeah man, good work so far!",
    senderId: "user_456",
    timestamp: "2025-04-15T09:17:45Z",
  },
  {
    id: "21",
    text: "Yeah man, good work so far!",
    senderId: "user_456",
    timestamp: "2025-04-15T09:17:45Z",
  },
];

const Main = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(dummyMessages);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);
  return (
    <Container>
      <TopBar>
        <User>
          <img
            src="https://api.dicebear.com/7.x/initials/svg?seed=John%20Doe"
            alt="avatar"
          />
          <Profile>
            <p>John Doe</p>
            <p>Active Now</p>
          </Profile>
        </User>
      </TopBar>

      <Chat>
        {messages.map((msg, index) => (
          <ChatBubble ref={scrollRef} key={msg.id} $msg={msg}>
            <div>
              <p style={{ margin: 0 }}>{msg.text}</p>
            </div>
          </ChatBubble>
        ))}
      </Chat>

      <MessageBar>
        <input type="text" placeholder="Type something ..." />
        <button>
          <Send />
        </button>
      </MessageBar>
    </Container>
  );
};

export default Main;
