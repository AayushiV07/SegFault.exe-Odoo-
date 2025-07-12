import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const HomePage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login"); // 👈 redirect to login if not logged in
      } else {
        setCurrentUser({
          email: user.email,
          name: user.displayName || "John Doe",
          photoURL:
            user.photoURL ||
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSearch = () => {
    console.log(`Searching for: "${searchQuery}"`);
  };

  const users = [
    // 👇 same dummy users list
    {
      id: 1,
      name: "Sarah Chen",
      photoURL:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      skillsOffered: ["JavaScript", "React", "Node.js"],
      skillsWanted: ["Python", "Machine Learning", "Data Science"],
      availability: ["evenings", "weekends"],
    },
    {
      id: 2,
      name: "Mike Johnson",
      photoURL:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 4.5,
      skillsOffered: ["Python", "Django", "PostgreSQL"],
      skillsWanted: ["React", "TypeScript", "AWS"],
      availability: ["weekends"],
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      photoURL:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      skillsOffered: ["UI/UX Design", "Figma", "Adobe Creative Suite"],
      skillsWanted: ["Frontend Development", "CSS", "JavaScript"],
      availability: ["evenings"],
    },
    {
      id: 4,
      name: "David Kim",
      photoURL:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      rating: 4.6,
      skillsOffered: ["Machine Learning", "TensorFlow", "Python"],
      skillsWanted: ["Mobile Development", "React Native", "Swift"],
      availability: ["weekends", "evenings"],
    },
    {
      id: 5,
      name: "Lisa Park",
      photoURL:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      rating: 4.7,
      skillsOffered: ["Digital Marketing", "SEO", "Content Strategy"],
      skillsWanted: ["Web Development", "WordPress", "E-commerce"],
      availability: ["weekends"],
    },
    {
      id: 6,
      name: "Alex Thompson",
      photoURL:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 4.4,
      skillsOffered: ["AWS", "DevOps", "Docker"],
      skillsWanted: ["Kubernetes", "Terraform", "CI/CD"],
      availability: ["evenings"],
    },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesAvailability =
      availabilityFilter === "" ||
      user.availability?.includes(availabilityFilter);

    const matchesSearch =
      searchQuery === "" ||
      user.skillsOffered?.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      user.skillsWanted?.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesAvailability && matchesSearch;
  });

  if (loading) return <div className="text-white text-center p-10">Loading...</div>;

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-white shadow-md sticky top-0 z-50">
        <h1 className="text-xl font-bold text-indigo-600">SkillHive</h1>

        <div className="flex items-center gap-4">
          <button
            onClick={() => handleNavigation("/swaprequests")}
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors"
          >
            Swap Request
          </button>
          <img
            src={currentUser?.photoURL}
            alt="Profile"
            onClick={() => handleNavigation("/profile")}
            className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-200 hover:border-indigo-300 transition-colors"
          />
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Filters */}
      <div className="flex justify-center items-center gap-4 p-4 bg-white shadow-sm">
        <select
          className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={availabilityFilter}
          onChange={(e) => setAvailabilityFilter(e.target.value)}
        >
          <option value="">All Availability</option>
          <option value="weekends">Weekends</option>
          <option value="evenings">Evenings</option>
        </select>

        <div className="flex items-center gap-2">
          <input
            type="text"
            className="border border-gray-300 px-3 py-2 rounded w-60 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search by skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
          >
            Search
          </button>
        </div>
      </div>

      {/* User Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4">
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-16 h-16 rounded-full border-2 object-cover"
              />
              <div>
                <h2 className="font-bold text-lg text-gray-800">{user.name}</h2>
                <p className="text-sm text-gray-500">Rating: ⭐ {user.rating}</p>
              </div>
            </div>

            <div>
              <p className="font-semibold text-sm mt-2 text-gray-700">Skills Offered:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {user.skillsOffered.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="font-semibold text-sm mt-2 text-gray-700">Skills Wanted:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {user.skillsWanted.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() =>
                currentUser
                  ? handleNavigation(`/request/${user.id}`)
                  : handleNavigation("/login")
              }
              className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
            >
              Request Skill Swap
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center my-6">
        <div className="flex gap-2">
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              className="px-3 py-1 border border-gray-300 rounded hover:bg-indigo-100"
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth, db } from "../firebase";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { collection, getDocs } from "firebase/firestore";

// const HomePage = () => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [users, setUsers] = useState([]);
//   const [availabilityFilter, setAvailabilityFilter] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();

//   // ✅ Check Auth + Fetch Users
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (!user) {
//         navigate("/login");
//       } else {
//         setCurrentUser({
//           email: user.email,
//           name: user.displayName || "John Doe",
//           photoURL:
//             user.photoURL ||
//             "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
//         });
//       }
//       setLoading(false);
//     });

//     // ✅ Fetch Users from Firestore
//     const fetchUsers = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "users"));
//         const userList = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setUsers(userList);
//       } catch (err) {
//         console.error("Error fetching users:", err);
//       }
//     };

//     fetchUsers();

//     return () => unsubscribe();
//   }, [navigate]);

//   const handleLogout = async () => {
//     await signOut(auth);
//     navigate("/login");
//   };

//   const handleNavigation = (path) => {
//     navigate(path);
//   };

//   const handleSearch = () => {
//     console.log(`Searching for: "${searchQuery}"`);
//   };

//   const filteredUsers = users.filter((user) => {
//     const matchesAvailability =
//       availabilityFilter === "" ||
//       user.availability?.includes(availabilityFilter);

//     const matchesSearch =
//       searchQuery === "" ||
//       user.skillsOffered?.some((skill) =>
//         skill.toLowerCase().includes(searchQuery.toLowerCase())
//       ) ||
//       user.skillsWanted?.some((skill) =>
//         skill.toLowerCase().includes(searchQuery.toLowerCase())
//       );

//     return matchesAvailability && matchesSearch;
//   });

//   if (loading) return <div className="text-white text-center p-10">Loading...</div>;

//   return (
//     <div className="w-full min-h-screen bg-gray-50">
//       {/* Navbar */}
//       <nav className="flex justify-between items-center p-4 bg-white shadow-md sticky top-0 z-50">
//         <h1 className="text-xl font-bold text-indigo-600">SkillHive</h1>

//         <div className="flex items-center gap-4">
//           <button
//             onClick={() => handleNavigation("/requests")}
//             className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors"
//           >
//             Swap Request
//           </button>
//           <img
//             src={currentUser?.photoURL}
//             alt="Profile"
//             onClick={() => handleNavigation("/profile")}
//             className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-200 hover:border-indigo-300 transition-colors"
//           />
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//           >
//             Logout
//           </button>
//         </div>
//       </nav>

//       {/* Filters */}
//       <div className="flex justify-center items-center gap-4 p-4 bg-white shadow-sm">
//         <select
//           className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           value={availabilityFilter}
//           onChange={(e) => setAvailabilityFilter(e.target.value)}
//         >
//           <option value="">All Availability</option>
//           <option value="weekends">Weekends</option>
//           <option value="evenings">Evenings</option>
//         </select>

//         <div className="flex items-center gap-2">
//           <input
//             type="text"
//             className="border border-gray-300 px-3 py-2 rounded w-60 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             placeholder="Search by skill..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//           />
//           <button
//             onClick={handleSearch}
//             className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
//           >
//             Search
//           </button>
//         </div>
//       </div>

//       {/* User Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//         {filteredUsers.map((user) => (
//           <div
//             key={user.id}
//             className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
//           >
//             <div className="flex items-center gap-4">
//               <img
//                 src={user.photoURL}
//                 alt="Profile"
//                 className="w-16 h-16 rounded-full border-2 object-cover"
//               />
//               <div>
//                 <h2 className="font-bold text-lg text-gray-800">{user.name}</h2>
//                 <p className="text-sm text-gray-500">Rating: ⭐ {user.rating || "N/A"}</p>
//               </div>
//             </div>

//             <div>
//               <p className="font-semibold text-sm mt-2 text-gray-700">Skills Offered:</p>
//               <div className="flex flex-wrap gap-2 mt-1">
//                 {user.skillsOffered?.map((skill, i) => (
//                   <span
//                     key={i}
//                     className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs"
//                   >
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <p className="font-semibold text-sm mt-2 text-gray-700">Skills Wanted:</p>
//               <div className="flex flex-wrap gap-2 mt-1">
//                 {user.skillsWanted?.map((skill, i) => (
//                   <span
//                     key={i}
//                     className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
//                   >
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             <button
//               onClick={() => handleNavigation(`/request/${user.id}`)}
//               className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
//             >
//               Request Skill Swap
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HomePage;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth, db } from "../firebase";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { collection, getDocs } from "firebase/firestore";

// const HomePage = () => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [allUsers, setAllUsers] = useState([]);
//   const [availabilityFilter, setAvailabilityFilter] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (!user) {
//         navigate("/login");
//       } else {
//         setCurrentUser({
//           uid: user.uid,
//           name: user.displayName || "John Doe",
//           email: user.email,
//           photoURL:
//             user.photoURL ||
//             "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150",
//         });

//         // Fetch users from Firestore
//         const querySnapshot = await getDocs(collection(db, "users"));
//         const usersList = querySnapshot.docs
//           .map((doc) => ({ id: doc.id, ...doc.data() }))
//           .filter((u) => u.uid !== user.uid); // exclude logged-in user

//         setAllUsers(usersList);
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, [navigate]);

//   const handleLogout = async () => {
//     await signOut(auth);
//     navigate("/login");
//   };

//   const handleNavigation = (path) => {
//     navigate(path);
//   };

//   const handleSearch = () => {
//     console.log("Searching...");
//   };

//   const filteredUsers = allUsers.filter((user) => {
//     const matchAvailability =
//       availabilityFilter === "" || user.availability?.includes(availabilityFilter);
//     const matchSearch =
//       searchQuery === "" ||
//       user.skillsOffered?.some((skill) =>
//         skill.toLowerCase().includes(searchQuery.toLowerCase())
//       ) ||
//       user.skillsWanted?.some((skill) =>
//         skill.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     return matchAvailability && matchSearch;
//   });

//   if (loading) return <div className="p-10 text-center text-gray-600">Loading...</div>;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navbar */}
//       <nav className="flex justify-between items-center p-4 bg-white shadow-md sticky top-0 z-50">
//         <h1 className="text-xl font-bold text-indigo-600">SkillHive</h1>

//         <div className="flex items-center gap-4">
//           <button
//             onClick={() => handleNavigation("/requests")}
//             className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
//           >
//             Swap Request
//           </button>
//           <img
//             src={currentUser?.photoURL}
//             alt="Profile"
//             onClick={() => handleNavigation("/profile")}
//             className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-300"
//           />
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//           >
//             Logout
//           </button>
//         </div>
//       </nav>

//       {/* Filters */}
//       <div className="flex justify-center items-center gap-4 p-4 bg-white shadow-sm">
//         <select
//           className="border border-gray-300 px-3 py-2 rounded focus:ring-indigo-500"
//           value={availabilityFilter}
//           onChange={(e) => setAvailabilityFilter(e.target.value)}
//         >
//           <option value="">All Availability</option>
//           <option value="weekends">Weekends</option>
//           <option value="evenings">Evenings</option>
//         </select>

//         <input
//           type="text"
//           className="border border-gray-300 px-3 py-2 rounded w-60 focus:ring-indigo-500"
//           placeholder="Search by skill..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//         />
//         <button
//           onClick={handleSearch}
//           className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
//         >
//           Search
//         </button>
//       </div>

//       {/* Users Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//         {filteredUsers.map((user) => (
//           <div
//             key={user.id}
//             className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
//           >
//             <div className="flex items-center gap-4">
//               <img
//                 src={user.photoURL}
//                 alt={user.name}
//                 className="w-16 h-16 rounded-full object-cover"
//               />
//               <div>
//                 <h2 className="font-bold text-lg text-gray-800">{user.name}</h2>
//                 <p className="text-sm text-gray-500">Rating: ⭐ {user.rating}</p>
//               </div>
//             </div>

//             <div className="mt-2">
//               <p className="font-medium text-sm text-gray-700">Skills Offered:</p>
//               <div className="flex flex-wrap gap-2 mt-1">
//                 {user.skillsOffered?.map((skill, i) => (
//                   <span
//                     key={i}
//                     className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs"
//                   >
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             <div className="mt-2">
//               <p className="font-medium text-sm text-gray-700">Skills Wanted:</p>
//               <div className="flex flex-wrap gap-2 mt-1">
//                 {user.skillsWanted?.map((skill, i) => (
//                   <span
//                     key={i}
//                     className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
//                   >
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             <button
//               onClick={() => handleNavigation(`/request/${user.id}`)}
//               className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
//             >
//               Request Skill Swap
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HomePage;

