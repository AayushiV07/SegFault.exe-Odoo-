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

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignUpPage";
// import UserProfilePage from "./pages/UserProfilePage";
// import HomePage from "./pages/HomePage";
// import HeroPage from "./pages/HeroPage";
// import ProtectedRoute from "./components/ProtectedRoute"; // ✅ Add this

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HeroPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />
//         <Route path="/profile" element={<UserProfilePage />} />

//         {/* ✅ Protected Home route */}
//         <Route
//           path="/home"
//           element={
//             <ProtectedRoute>
//               <HomePage />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPage";
import UserProfilePage from "./pages/UserProfilePage";
import HomePage from "./pages/HomePage";
import HeroPage from "./pages/HeroPage";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import SwapRequestsPage from "./pages/SwapRequestsPage";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeroPage />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/home" />} />
        <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to="/home" />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/home" element={user ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/swaprequests" element={<SwapRequestsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
