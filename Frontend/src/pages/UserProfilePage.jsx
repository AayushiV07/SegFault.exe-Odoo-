import React, { useState, useRef } from "react";

export default function UserProfilePage() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [availability, setAvailability] = useState("Weekends");
  const [skillsOffered, setSkillsOffered] = useState([]);
  const [skillsRequired, setSkillsRequired] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [requiredSkillInput, setRequiredSkillInput] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const fileInputRef = useRef(null);

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      setSkillsOffered([...skillsOffered, skillInput]);
      setSkillInput("");
    }
  };

  const handleAddRequiredSkill = () => {
    if (requiredSkillInput.trim()) {
      setSkillsRequired([...skillsRequired, requiredSkillInput]);
      setRequiredSkillInput("");
    }
  };

  const handleSave = () => {
    alert("Profile Saved!");
  };

  const handleDiscard = () => {
    setName("");
    setLocation("");
    setAvailability("Weekends");
    setSkillsOffered([]);
    setSkillsRequired([]);
    setIsPublic(true);
    setProfilePhoto(null);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePhoto(imageUrl);
    }
  };

  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-950 text-white px-6 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-10 bg-blue-200 text-blue-900 px-6 py-4 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold">SkillHive - User Profile</h1>
        <div className="flex gap-4">
          <button onClick={handleSave} className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-md">
            Save
          </button>
          <button onClick={handleDiscard} className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-md">
            Discard
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md">
            Swap Request
          </button>
          <button className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-2 rounded-md">
            Home
          </button>
        </div>
      </div>

      {/* Centered Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-gray-900 space-y-8">
        {/* Profile Image Section */}
        <div className="flex flex-col items-center">
          <img
            src={profilePhoto || "https://via.placeholder.com/180"}
            alt="User"
            className="rounded-full border-4 border-blue-600 w-44 h-44 object-cover mb-4"
          />
          <button
            onClick={openFilePicker}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Change Photo
          </button>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            ref={fileInputRef}
            className="hidden"
          />
        </div>

        {/* Input Fields */}
        <div className="space-y-6">
          <div>
            <label className="block text-lg font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-1">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-1">Availability</label>
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="Weekends">Weekends</option>
              <option value="Evenings">Evenings</option>
              <option value="Weekdays">Weekdays</option>
              <option value="Anytime">Anytime</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="block text-lg font-medium mb-1">Profile Visibility</label>
            <button
              onClick={() => setIsPublic(!isPublic)}
              className={`w-fit px-5 py-3 text-lg text-white rounded-md transition ${
                isPublic ? "bg-green-600 hover:bg-green-700" : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {isPublic ? "Public" : "Private"}
            </button>
          </div>

          {/* Skills Offered */}
          <div>
            <label className="block text-lg font-medium mb-1">Skills Offered</label>
            <div className="flex gap-3 mb-3">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                className="flex-1 border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Photoshop"
              />
              <button
                onClick={handleAddSkill}
                className="bg-blue-600 text-white px-4 py-3 text-lg rounded-md hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {skillsOffered.map((skill, idx) => (
                <span key={idx} className="bg-blue-700 text-white px-4 py-2 rounded-full text-base">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Skills Required */}
          <div>
            <label className="block text-lg font-medium mb-1">Skills Required</label>
            <div className="flex gap-3 mb-3">
              <input
                type="text"
                value={requiredSkillInput}
                onChange={(e) => setRequiredSkillInput(e.target.value)}
                className="flex-1 border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Excel"
              />
              <button
                onClick={handleAddRequiredSkill}
                className="bg-blue-600 text-white px-4 py-3 text-lg rounded-md hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {skillsRequired.map((skill, idx) => (
                <span key={idx} className="bg-blue-700 text-white px-4 py-2 rounded-full text-base">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}