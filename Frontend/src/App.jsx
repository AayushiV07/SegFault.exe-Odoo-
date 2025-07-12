// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignUpPage";
// import UserProfilePage from "./pages/UserProfilePage";
// import HomePage from "./pages/HomePage"; // ✅ Import HomePage
// import HeroPage from "./pages/HeroPage";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />
//         <Route path="/profile" element={<UserProfilePage />} />
//         <Route path="/" element={<HeroPage/>} />
//         <Route path="/home" element={<HomePage />} /> {/* ✅ Home route added */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPage";
import UserProfilePage from "./pages/UserProfilePage";
import HomePage from "./pages/HomePage";
import HeroPage from "./pages/HeroPage";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ Add this

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeroPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<UserProfilePage />} />

        {/* ✅ Protected Home route */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
