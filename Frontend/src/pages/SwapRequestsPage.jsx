import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, Clock, MessageSquare, Star, Calendar, Trash2, Edit3, Eye, EyeOff } from "lucide-react";

const SwapRequestsPage = () => {
  const [currentUser, setCurrentUser] = useState({
    uid: "user123",
    photoURL: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    name: "John Doe",
    location: "New York, NY",
    isPublic: true,
    availability: "Weekends, Evenings",
    skillsOffered: ["JavaScript", "Python", "React"],
    skillsWanted: ["Machine Learning", "UI/UX Design", "Data Science"]
  });

  const [requests, setRequests] = useState([
    {
      id: 1,
      fromUserId: "user456",
      toUserId: "user123",
      fromName: "Sarah Chen",
      fromPhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      offeredSkill: "JavaScript",
      wantedSkill: "Python",
      status: "pending",
      message: "Hi! I'd love to exchange JavaScript knowledge for Python. I have 3 years of experience with React and Node.js.",
      createdAt: "2024-01-15",
      rating: 4.8,
      type: "received",
      availability: "Weekends",
      location: "San Francisco, CA"
    },
    {
      id: 2,
      fromUserId: "user123",
      toUserId: "user789",
      fromName: "Mike Johnson",
      fromPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      offeredSkill: "Python",
      wantedSkill: "React",
      status: "accepted",
      message: "Looking forward to learning React from you!",
      createdAt: "2024-01-12",
      rating: 4.6,
      type: "sent",
      availability: "Evenings",
      location: "Austin, TX"
    },
    {
      id: 3,
      fromUserId: "user101",
      toUserId: "user123",
      fromName: "Emily Rodriguez",
      fromPhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      offeredSkill: "UI/UX Design",
      wantedSkill: "Frontend Development",
      status: "rejected",
      message: "I can help with Figma and design systems in exchange for frontend mentoring.",
      createdAt: "2024-01-10",
      rating: 4.9,
      type: "received",
      availability: "Flexible",
      location: "Los Angeles, CA"
    },
    {
      id: 4,
      fromUserId: "user123",
      toUserId: "user202",
      fromName: "David Kim",
      fromPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      offeredSkill: "JavaScript",
      wantedSkill: "Machine Learning",
      status: "completed",
      message: "Excited to learn ML fundamentals from you!",
      createdAt: "2024-01-08",
      rating: 4.7,
      type: "sent",
      availability: "Weekends",
      location: "Seattle, WA"
    },
    {
      id: 5,
      fromUserId: "user303",
      toUserId: "user123",
      fromName: "Lisa Wang",
      fromPhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      offeredSkill: "Data Science",
      wantedSkill: "Web Development",
      status: "rejected",
      message: "I can teach Python for data analysis in exchange for web development skills.",
      createdAt: "2024-01-05",
      rating: 4.5,
      type: "received",
      availability: "Evenings",
      location: "Boston, MA"
    }
  ]);

  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showContactModal, setShowContactModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [feedback, setFeedback] = useState({ rating: 5, comment: "" });

  const handleNavigation = (path) => {
    console.log(`Navigating to: ${path}`);
  };

  const handleAction = async (id, action) => {
    console.log(`${action} request ${id}`);
    
    // Update request status
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: action } : req
    ));

    // Show success message
    if (action === "accepted") {
      alert("Request accepted! You can now contact each other to arrange the skill swap.");
    } else if (action === "rejected") {
      alert("Request rejected.");
    }
  };

  const handleDeleteRequest = (requestId) => {
    const requestToDelete = requests.find(req => req.id === requestId);
    setSelectedRequest(requestToDelete);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedRequest) {
      setRequests(prev => prev.filter(req => req.id !== selectedRequest.id));
      setShowDeleteModal(false);
      setSelectedRequest(null);
      alert("Request deleted successfully!");
    }
  };

  const handleContactUser = (request) => {
    setSelectedRequest(request);
    setShowContactModal(true);
  };

  const handleCompleteSwap = (requestId) => {
    console.log(`Completing swap for request ${requestId}`);
    setRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: "completed" } : req
    ));
    alert("Swap marked as completed! Please provide feedback.");
  };

  const handleLeaveFeedback = (request) => {
    setSelectedRequest(request);
    setShowFeedbackModal(true);
  };

  const submitFeedback = () => {
    console.log("Feedback submitted:", feedback);
    // In a real app, this would send feedback to the server
    alert("Thank you for your feedback!");
    setShowFeedbackModal(false);
    setFeedback({ rating: 5, comment: "" });
  };

  const toggleProfileVisibility = () => {
    setCurrentUser(prev => ({
      ...prev,
      isPublic: !prev.isPublic
    }));
  };

  const filteredRequests = requests.filter(req => {
    const matchesFilter = filter === "all" || req.status === filter;
    const matchesSearch = req.fromName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         req.offeredSkill.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         req.wantedSkill.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case "pending": return "text-orange-600 bg-orange-50";
      case "accepted": return "text-green-600 bg-green-50";
      case "rejected": return "text-red-600 bg-red-50";
      case "completed": return "text-blue-600 bg-blue-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case "pending": return <Clock className="w-4 h-4" />;
      case "accepted": return <CheckCircle className="w-4 h-4" />;
      case "rejected": return <XCircle className="w-4 h-4" />;
      case "completed": return <Star className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-white shadow-md sticky top-0 z-50">
        <h1 className="text-xl font-bold text-indigo-600">SkillHive</h1>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => handleNavigation("/browse")}
            className="text-indigo-600 hover:underline font-medium"
          >
            Browse Skills
          </button>
          <button
            onClick={() => handleNavigation("/home")}
            className="text-indigo-600 hover:underline font-medium"
          >
            Home
          </button>
          <button
            onClick={() => handleNavigation("/profile")}
            className="text-indigo-600 hover:underline font-medium"
          >
            Profile
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleProfileVisibility}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title={currentUser.isPublic ? "Profile is Public" : "Profile is Private"}
            >
              {currentUser.isPublic ? (
                <Eye className="w-5 h-5 text-green-600" />
              ) : (
                <EyeOff className="w-5 h-5 text-gray-600" />
              )}
            </button>
            <img
              src={currentUser?.photoURL || "/default-avatar.png"}
              onClick={() => handleNavigation("/profile")}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-gray-200 cursor-pointer hover:border-indigo-300 transition-colors"
            />
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h2 className="text-2xl font-bold text-gray-800">Swap Requests</h2>
          <p className="text-gray-600 mt-1">Manage your skill swap requests</p>
          <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
            <span>Profile: {currentUser.isPublic ? "Public" : "Private"}</span>
            <span>•</span>
            <span>Available: {currentUser.availability}</span>
            {currentUser.location && (
              <>
                <span>•</span>
                <span>Location: {currentUser.location}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex justify-center items-center gap-4 p-4 bg-white shadow-sm">
        <select
          className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
          <option value="completed">Completed</option>
        </select>
        <input
          type="text"
          placeholder="Search by name or skill..."
          className="border border-gray-300 px-3 py-2 rounded w-80 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Requests */}
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRequests.map((req) => (
          <div
            key={req.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-indigo-500"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-4 items-center">
                <img
                  src={req.fromPhoto || "/default-avatar.png"}
                  className="w-16 h-16 rounded-full border-2 border-gray-200 object-cover"
                  alt="profile"
                />
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{req.fromName}</h3>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    {req.rating || "N/A"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {req.type === "received" ? "Request from" : "Request to"} • {req.createdAt}
                  </p>
                  {req.location && (
                    <p className="text-xs text-gray-500">{req.location}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(req.status)}`}>
                  {getStatusIcon(req.status)}
                  <span className="capitalize">{req.status}</span>
                </div>
                {req.status === "rejected" && (
                  <button
                    onClick={() => handleDeleteRequest(req.id)}
                    className="p-1 hover:bg-red-100 rounded-full transition-colors"
                    title="Delete request"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <p className="font-semibold text-sm text-gray-700">Skills Exchange:</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                    Offers: {req.offeredSkill}
                  </span>
                  <span className="text-gray-400">⇄</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                    Wants: {req.wantedSkill}
                  </span>
                </div>
              </div>

              {req.availability && (
                <div>
                  <p className="font-semibold text-sm text-gray-700">Availability:</p>
                  <p className="text-sm text-gray-600">{req.availability}</p>
                </div>
              )}

              {req.message && (
                <div>
                  <p className="font-semibold text-sm text-gray-700">Message:</p>
                  <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded mt-1">
                    {req.message}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 flex-wrap">
              {req.status === "pending" && req.type === "received" && (
                <>
                  <button
                    onClick={() => handleAction(req.id, "accepted")}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors font-medium flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Accept
                  </button>
                  <button
                    onClick={() => handleAction(req.id, "rejected")}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors font-medium flex items-center gap-2"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </button>
                </>
              )}
              
              {req.status === "accepted" && (
                <>
                  <button
                    onClick={() => handleContactUser(req)}
                    className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors font-medium flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Contact
                  </button>
                  <button
                    onClick={() => handleCompleteSwap(req.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors font-medium flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    Mark Complete
                  </button>
                </>
              )}

              {req.status === "completed" && (
                <button
                  onClick={() => handleLeaveFeedback(req)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors font-medium flex items-center gap-2"
                >
                  <Star className="w-4 h-4" />
                  Leave Feedback
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No swap requests found.</p>
          <button
            onClick={() => handleNavigation("/browse")}
            className="mt-4 bg-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-600 transition-colors"
          >
            Browse Skills
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-bold mb-4 text-red-600">Delete Request</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete this swap request from <strong>{selectedRequest.fromName}</strong>?
            </p>
            <div className="bg-gray-50 p-3 rounded mb-4">
              <p className="text-sm"><strong>Skill Exchange:</strong> {selectedRequest.offeredSkill} ⇄ {selectedRequest.wantedSkill}</p>
              <p className="text-sm text-gray-600 mt-1">Status: {selectedRequest.status}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-bold mb-4">Contact {selectedRequest.fromName}</h3>
            <p className="text-gray-600 mb-4">
              You can now contact each other to arrange your skill swap session.
            </p>
            <div className="bg-gray-50 p-4 rounded mb-4">
              <p className="text-sm font-medium">Suggested next steps:</p>
              <ul className="text-sm text-gray-600 mt-2 space-y-1">
                <li>• Schedule a video call or in-person meeting</li>
                <li>• Discuss learning objectives and timeline</li>
                <li>• Exchange contact information</li>
                <li>• Set up regular practice sessions</li>
              </ul>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowContactModal(false)}
                className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleNavigation(`/chat/${selectedRequest.fromUserId}`);
                  setShowContactModal(false);
                }}
                className="flex-1 bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition-colors"
              >
                Start Chat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-bold mb-4">Leave Feedback for {selectedRequest.fromName}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating (1-5 stars)
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setFeedback(prev => ({ ...prev, rating: star }))}
                      className={`p-1 ${star <= feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      <Star className="w-6 h-6 fill-current" />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comment (optional)
                </label>
                <textarea
                  value={feedback.comment}
                  onChange={(e) => setFeedback(prev => ({ ...prev, comment: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={3}
                  placeholder="Share your experience..."
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitFeedback}
                className="flex-1 bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition-colors"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center my-6">
        <div className="flex gap-2">
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              className="px-3 py-1 border border-gray-300 rounded hover:bg-indigo-100 transition-colors"
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SwapRequestsPage;