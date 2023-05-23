import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./components/login/login";
import PostPage from "./pages/postPage";
import UserPage from "./pages/userPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/home" element={<UserPage />} />
        <Route path="/admin/posts" element={<PostPage />} />
      </Routes>
    </Router>
  );
}

export default App;
