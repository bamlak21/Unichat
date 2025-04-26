import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Login from "./Pages/Login";
import Chat from "./Pages/Chat";
import Register from "./Pages/Register";
import { User } from "./types/user";

function App() {
  const [user, setUser] = useState<User | null>(null);
  return (
    <Router>
      <Routes>
        {!user ? (
          <>
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Login setUser={setUser} />} />
          </>
        ) : (
          <Route path="/" element={<Chat />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
