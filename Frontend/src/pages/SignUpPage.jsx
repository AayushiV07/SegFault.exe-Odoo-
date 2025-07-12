// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";

// export default function SignupPage() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       alert("Account created successfully!");
//       navigate("/home");
//     } catch (error) {
//       alert("Error signing up. Try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-950 flex items-center justify-center px-4">
//       <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold text-white">SkillHive</h1>
//           <p className="text-gray-400 mt-1">Create your SkillHive account.</p>
//         </div>

//         <form onSubmit={handleSignup} className="space-y-4">
//           <div>
//             <label className="block text-sm text-gray-300 mb-1">Name</label>
//             <input
//               type="text"
//               className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Your name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-gray-300 mb-1">Email</label>
//             <input
//               type="email"
//               className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="you@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-gray-300 mb-1">Password</label>
//             <input
//               type="password"
//               className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="••••••••"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <div className="flex items-center justify-end">
//             <button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition"
//             >
//               Sign Up
//             </button>
//           </div>
//         </form>

//         <p className="text-sm text-center text-gray-400">
//           Already have an account?{" "}
//           <Link to="/login" className="text-blue-400 hover:underline">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { auth, db } from "../firebase";
// import { collection, addDoc } from "firebase/firestore";

// export default function SignupPage() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       // Create the user
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Update user display name in Firebase Auth
//       await updateProfile(user, { displayName: name });

//       // Add user to Firestore users collection
//       await addDoc(collection(db, "users"), {
//         uid: user.uid,
//         name: name,
//         email: email,
//         photoURL:
//           "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
//         rating: 4.5,
//         skillsOffered: [],
//         skillsWanted: [],
//         availability: [],
//       });

//       alert("Account created successfully!");
//       navigate("/home");
//     } catch (error) {
//       console.error("Signup Error:", error);
//       alert("Error signing up. Try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-950 flex items-center justify-center px-4">
//       <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold text-white">SkillHive</h1>
//           <p className="text-gray-400 mt-1">Create your SkillHive account.</p>
//         </div>

//         <form onSubmit={handleSignup} className="space-y-4">
//           <div>
//             <label className="block text-sm text-gray-300 mb-1">Name</label>
//             <input
//               type="text"
//               className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Your name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-gray-300 mb-1">Email</label>
//             <input
//               type="email"
//               className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="you@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-gray-300 mb-1">Password</label>
//             <input
//               type="password"
//               className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="••••••••"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <div className="flex items-center justify-end">
//             <button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition"
//             >
//               Sign Up
//             </button>
//           </div>
//         </form>

//         <p className="text-sm text-center text-gray-400">
//           Already have an account?{" "}
//           <Link to="/login" className="text-blue-400 hover:underline">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update display name in Firebase Auth
      await updateProfile(user, {
        displayName: name,
        photoURL: "https://api.dicebear.com/7.x/thumbs/svg?seed=" + name, // Random avatar
      });

      // Save user to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        photoURL: user.photoURL,
        rating: 4.5,
        skillsOffered: [],
        skillsWanted: [],
        availability: [],
      });

      alert("Account created successfully!");
      navigate("/home");
    } catch (error) {
      console.error(error.message);
      alert("Error signing up. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">SkillHive</h1>
          <p className="text-gray-400 mt-1">Create your SkillHive account.</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

