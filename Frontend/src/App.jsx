import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserProfilePage from "./pages/UserProfilePage";
import HomePage from "./pages/HomePage"; // ✅ Import HomePage
import HeroPage from "./pages/HeroPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/hero" element={<HeroPage/>} />
        <Route path="/home" element={<HomePage />} /> {/* ✅ Home route added */}
      </Routes>
    </Router>
  );
}

export default App;