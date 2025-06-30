import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import ChatPage from './pages/ChatPage';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/chats" element={<ChatPage />} />
        <Route path="/Register" element={<Register/>}/>
      </Routes>
    </Router>
  );
}

export default App;