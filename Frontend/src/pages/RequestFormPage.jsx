import React, { useState, useEffect } from 'react';
import { Send, ArrowLeft, User, MessageSquare, Star, Calendar } from 'lucide-react';

const RequestPage = () => {
  // Mock data for preview
  const [recipient] = useState({
    uid: "user456",
    name: "Sarah Chen",
    photoURL: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    location: "San Francisco, CA",
    rating: 4.8,
    wantedSkills: ["Python", "Machine Learning", "Data Science", "Backend Development", "API Development"],
    offeredSkills: ["JavaScript", "React", "Node.js", "Frontend Development"],
    availability: "Weekends, Evenings"
  });
  
  const [currentUser] = useState({
    uid: "user123",
    name: "John Doe",
    photoURL: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    offeredSkills: ["Python", "Django", "Machine Learning", "Data Analysis", "SQL"]
  });

  const [yourSkills, setYourSkills] = useState([]);
  const [selectedYourSkill, setSelectedYourSkill] = useState('');
  const [selectedTheirSkill, setSelectedTheirSkill] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simulate fetching current user's offered skills
  useEffect(() => {
    const fetchYourSkills = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          setYourSkills(currentUser.offeredSkills || []);
        }, 500);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };
    fetchYourSkills();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Swap request data:', {
        from: currentUser.uid,
        to: recipient.uid,
        yourSkill: selectedYourSkill,
        theirSkill: selectedTheirSkill,
        message,
        timestamp: new Date()
      });
      
      alert('Swap request sent successfully!');
      // In real app: navigate('/');
    } catch (error) {
      console.error('Error sending request:', error);
      alert('Failed to send request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoBack = () => {
    console.log('Going back to previous page');
    // In real app: navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleGoBack}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Request Skill Swap</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recipient Info Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={recipient.photoURL}
                alt={recipient.name}
                className="w-16 h-16 rounded-full border-2 border-gray-200 object-cover"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-800">{recipient.name}</h3>
                <p className="text-gray-600 flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  {recipient.rating} rating
                </p>
                <p className="text-sm text-gray-500">{recipient.location}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Skills They Offer:</h4>
                <div className="flex flex-wrap gap-2">
                  {recipient.offeredSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Skills They Want:</h4>
                <div className="flex flex-wrap gap-2">
                  {recipient.wantedSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Availability:</h4>
                <p className="text-gray-600 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {recipient.availability}
                </p>
              </div>
            </div>
          </div>

          {/* Request Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-indigo-600" />
              Send Swap Request
            </h2>
            
            <div className="space-y-6">
              {/* Your Offered Skill */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Choose one of your offered skills
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={selectedYourSkill}
                  onChange={(e) => setSelectedYourSkill(e.target.value)}
                  required
                >
                  <option value="">Select a skill you can offer</option>
                  {yourSkills.map((skill, idx) => (
                    <option key={idx} value={skill}>
                      {skill}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  This is what you'll teach {recipient.name}
                </p>
              </div>

              {/* Their Wanted Skill */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Choose what you want to learn from them
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={selectedTheirSkill}
                  onChange={(e) => setSelectedTheirSkill(e.target.value)}
                  required
                >
                  <option value="">Select a skill you want to learn</option>
                  {recipient?.wantedSkills?.map((skill, idx) => (
                    <option key={idx} value={skill}>
                      {skill}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  This is what {recipient.name} will teach you
                </p>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Personal Message
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows="4"
                  placeholder="Hi! I'd love to exchange skills with you. Tell me about your experience and what you're looking for..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">
                  Share your experience and what you hope to learn
                </p>
              </div>

              {/* Preview */}
              {selectedYourSkill && selectedTheirSkill && (
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h4 className="font-semibold text-gray-800 mb-2">Swap Preview:</h4>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                      You teach: {selectedYourSkill}
                    </span>
                    <span className="text-gray-400">⇄</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      You learn: {selectedTheirSkill}
                    </span>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                    isSubmitting
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Swap Request
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Tips for a Great Swap Request</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-700">Be Specific</h4>
              <p className="text-sm text-gray-600">
                Mention your experience level and what specific aspects you'd like to learn or teach.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-700">Set Expectations</h4>
              <p className="text-sm text-gray-600">
                Let them know your availability and preferred learning format (online, in-person, etc.).
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-700">Show Enthusiasm</h4>
              <p className="text-sm text-gray-600">
                Express genuine interest in both teaching your skill and learning theirs.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-700">Be Professional</h4>
              <p className="text-sm text-gray-600">
                Keep your message friendly but professional. First impressions matter!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestPage;