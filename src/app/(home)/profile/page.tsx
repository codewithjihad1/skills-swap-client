// This directive tells Next.js to render this component on the client side
// Required when using React hooks like useState, useEffect, etc.
"use client";

import Image from 'next/image';
// Import React and necessary hooks from React library
// useState: Manages component state
// useEffect: Handles side effects (like API calls)
import React, { useState, useEffect } from 'react';

// Define TypeScript interface for a Skill object
// This ensures type safety and makes code more maintainable
interface Skill {
  id: string;           // Unique identifier for the skill
  name: string;         // Name of the skill (e.g., "React", "Photography")
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';  // Skill proficiency level
  category: string;     // Category of the skill (e.g., "Web Development")
  endorsements: number; // Number of endorsements the skill has received
}

// Define TypeScript interface for UserProfile object
// This structures the user data we expect to work with
interface UserProfile {
  id: string;                   // Unique user identifier
  name: string;                 // User's full name
  email: string;                // User's email address
  avatar: string;               // URL to user's profile picture
  bio: string;                  // User's biography/description
  location: string;             // User's location
  skillsToTeach: Skill[];       // Array of skills the user can teach
  skillsToLearn: Skill[];       // Array of skills the user wants to learn
  rating: number;               // User's average rating (0-5)
  completedExchanges: number;   // Number of completed skill exchanges
  memberSince: string;          // Date when user joined the platform
}

// Main ProfilePage component definition
// React.FC indicates this is a Functional Component with TypeScript
const ProfilePage: React.FC = () => {
  // State for user data with initial empty values
  // setUser function is used to update the user state
  const [user, setUser] = useState<UserProfile>({
    id: '',
    name: '',
    email: '',
    avatar: '',
    bio: '',
    location: '',
    skillsToTeach: [],
    skillsToLearn: [],
    rating: 0,
    completedExchanges: 0,
    memberSince: '',
  });

  // State to track if the profile is being edited
  const [isEditing, setIsEditing] = useState(false);
  
  // State to manage the form data during editing
  const [editForm, setEditForm] = useState({
    name: user.name,
    bio: user.bio,
    location: user.location,
  });

  // State to track loading status
  const [isLoading, setIsLoading] = useState(true);
  
  // State to track any error messages
  const [error, setError] = useState('');

  // State for managing skill editing
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  
  // State for the new skill form
  const [newSkill, setNewSkill] = useState({
    name: '',
    level: 'Intermediate' as 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert',
    category: '',
  });

  // State to control which skill category we're viewing/editing
  const [activeSkillCategory, setActiveSkillCategory] = useState<'teach' | 'learn'>('teach');

  // useEffect hook runs after the component mounts
  // The empty dependency array means it runs only once
  useEffect(() => {
    // Simulate API call to fetch user data
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        // In a real application, this would be an API call
        // For demo purposes, we're using a timeout to simulate network delay
        setTimeout(() => {
          // Mock user data - in a real app, this would come from an API response
          const mockUser: UserProfile = {
            id: 'user-123',
            name: 'Alex Johnson',
            email: 'alex.johnson@example.com',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            bio: 'Passionate about sharing knowledge and learning new skills. Currently focusing on web development and photography.',
            location: 'San Francisco, CA',
            skillsToTeach: [
              { id: '1', name: 'React', level: 'Advanced', category: 'Web Development', endorsements: 5 },
              { id: '2', name: 'Photography', level: 'Intermediate', category: 'Arts', endorsements: 3 },
              { id: '3', name: 'TypeScript', level: 'Intermediate', category: 'Web Development', endorsements: 2 },
            ],
            skillsToLearn: [
              { id: '4', name: 'Guitar', level: 'Beginner', category: 'Music', endorsements: 0 },
              { id: '5', name: 'Digital Marketing', level: 'Beginner', category: 'Business', endorsements: 1 },
            ],
            rating: 4.7,
            completedExchanges: 12,
            memberSince: 'January 2023',
          };
          
          setUser(mockUser);
          setEditForm({
            name: mockUser.name,
            bio: mockUser.bio,
            location: mockUser.location,
          });
          setIsLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load profile data');
        setIsLoading(false);
        console.error(err);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array means this runs once on component mount

  // Handle saving edited profile information
  const handleSave = () => {
    // Update the user state with the edited values
    setUser({
      ...user,          // Spread operator to keep existing user properties
      name: editForm.name,
      bio: editForm.bio,
      location: editForm.location,
    });
    // Exit editing mode
    setIsEditing(false);
  };

  // Handle canceling the edit operation
  const handleCancel = () => {
    // Reset the edit form to the original user values
    setEditForm({
      name: user.name,
      bio: user.bio,
      location: user.location,
    });
    // Exit editing mode
    setIsEditing(false);
  };

  // Handle input changes in the edit form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Update the editForm state with the new value for the changed field
    setEditForm({
      ...editForm,      // Keep existing form values
      [name]: value,    // Update the specific field that changed
    });
  };

  // Handle input changes in the new skill form
  const handleNewSkillChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Update the newSkill state with the new value
    setNewSkill({
      ...newSkill,
      [name]: value,
    });
  };

  // Add a new skill to the user's profile
  const handleAddSkill = () => {
    // Create a new skill object with a unique ID
    const skill: Skill = {
      id: Date.now().toString(), // Simple ID generation (not production-safe)
      name: newSkill.name,
      level: newSkill.level,
      category: newSkill.category,
      endorsements: 0,
    };

    // Update the user's skills based on the active category
    if (activeSkillCategory === 'teach') {
      setUser({
        ...user,
        skillsToTeach: [...user.skillsToTeach, skill],
      });
    } else {
      setUser({
        ...user,
        skillsToLearn: [...user.skillsToLearn, skill],
      });
    }

    // Reset the new skill form
    setNewSkill({
      name: '',
      level: 'Intermediate',
      category: '',
    });
  };

  // Remove a skill from the user's profile
  const handleRemoveSkill = (skillId: string, category: 'teach' | 'learn') => {
    if (category === 'teach') {
      setUser({
        ...user,
        skillsToTeach: user.skillsToTeach.filter(skill => skill.id !== skillId),
      });
    } else {
      setUser({
        ...user,
        skillsToLearn: user.skillsToLearn.filter(skill => skill.id !== skillId),
      });
    }
  };

  // Start editing a skill
  const handleEditSkill = (skill: Skill) => {
    setEditingSkill(skill);
  };

  // Save the edited skill
  const handleSaveSkill = () => {
    if (!editingSkill) return;

    if (activeSkillCategory === 'teach') {
      setUser({
        ...user,
        skillsToTeach: user.skillsToTeach.map(skill => 
          skill.id === editingSkill.id ? editingSkill : skill
        ),
      });
    } else {
      setUser({
        ...user,
        skillsToLearn: user.skillsToLearn.map(skill => 
          skill.id === editingSkill.id ? editingSkill : skill
        ),
      });
    }

    setEditingSkill(null);
  };

  // Cancel skill editing
  const handleCancelEditSkill = () => {
    setEditingSkill(null);
  };

  // Handle changes when editing a skill
  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!editingSkill) return;
    
    const { name, value } = e.target;
    setEditingSkill({
      ...editingSkill,
      [name]: value,
    });
  };

  // Show loading indicator while data is being fetched
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Show error message if there was a problem loading data
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 text-xl font-semibold">Error</div>
          <p className="mt-2 text-gray-600">{error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Determine which skills to display based on active category
  const activeSkills = activeSkillCategory === 'teach' ? user.skillsToTeach : user.skillsToLearn;

  // Main component render method
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          {/* Profile banner with gradient background */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-32"></div>
          
          {/* Profile content area */}
          <div className="px-6 pb-6 -mt-16">
            <div className="flex flex-col sm:flex-row items-center sm:items-end">
              {/* Profile avatar image */}
              <Image
                className="h-24 w-24 rounded-full border-4 border-white shadow-md"
                src={user.avatar}
                alt={user.name}
                width={96}
                height={96}
              />
              
              {/* User name, location, and rating */}
              <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
                {isEditing ? (
                  // Show input field when editing name
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleInputChange}
                    className="text-2xl font-bold text-gray-900 bg-gray-100 rounded-md px-3 py-2 mb-2"
                  />
                ) : (
                  // Show static text when not editing
                  <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                )}
                
                {isEditing ? (
                  // Show input field when editing location
                  <input
                    type="text"
                    name="location"
                    value={editForm.location}
                    onChange={handleInputChange}
                    className="text-sm text-gray-600 bg-gray-100 rounded-md px-3 py-1"
                  />
                ) : (
                  // Show static text when not editing
                  <p className="text-sm text-gray-600">{user.location}</p>
                )}
                
                {/* User rating display */}
                <div className="flex items-center mt-1">
                  <div className="flex text-yellow-400">
                    {/* Render star icons based on rating */}
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-5 w-5 ${i < Math.floor(user.rating) ? 'fill-current' : 'stroke-current'}`}
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {user.rating} • {user.completedExchanges} exchanges
                  </span>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="mt-4 sm:mt-0 sm:ml-auto flex space-x-3">
                <button className="px-4 py-2 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-md hover:bg-indigo-200 transition">
                  Message
                </button>
                <button 
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? 'View Profile' : 'Edit Profile'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - About and Skills to Teach */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">About</h2>
              {isEditing ? (
                // Show textarea when editing bio
                <div className="space-y-4">
                  <textarea
                    name="bio"
                    rows={4}
                    value={editForm.bio}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <div className="flex space-x-2">
                    <button 
                      className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button 
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // Show static bio when not editing
                <p className="text-gray-700">{user.bio}</p>
              )}
            </div>

            {/* Skills Section with Tabs */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Tabs for switching between skills to teach and learn */}
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  <button
                    className={`ml-6 py-4 px-1 text-sm font-medium border-b-2 ${
                      activeSkillCategory === 'teach'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveSkillCategory('teach')}
                  >
                    Skills I Can Teach
                  </button>
                  <button
                    className={`ml-6 py-4 px-1 text-sm font-medium border-b-2 ${
                      activeSkillCategory === 'learn'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveSkillCategory('learn')}
                  >
                    Skills I Want to Learn
                  </button>
                </nav>
              </div>

              <div className="p-6">
                {/* Add New Skill Form */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-md font-medium text-gray-900 mb-3">Add New Skill</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <input
                      type="text"
                      placeholder="Skill name"
                      name="name"
                      value={newSkill.name}
                      onChange={handleNewSkillChange}
                      className="col-span-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <select
                      name="level"
                      value={newSkill.level}
                      onChange={handleNewSkillChange}
                      className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Expert">Expert</option>
                    </select>
                    <button
                      onClick={handleAddSkill}
                      disabled={!newSkill.name.trim()}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add Skill
                    </button>
                  </div>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {activeSkills.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">
                      No {activeSkillCategory === 'teach' ? 'teaching' : 'learning'} skills added yet.
                    </p>
                  ) : (
                    activeSkills.map((skill) => (
                      <div key={skill.id} className="flex justify-between items-start p-4 border rounded-lg hover:shadow-md transition">
                        {editingSkill?.id === skill.id ? (
                          // Edit skill form
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                              type="text"
                              name="name"
                              value={editingSkill.name}
                              onChange={handleSkillChange}
                              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <select
                              name="level"
                              value={editingSkill.level}
                              onChange={handleSkillChange}
                              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                              <option value="Beginner">Beginner</option>
                              <option value="Intermediate">Intermediate</option>
                              <option value="Advanced">Advanced</option>
                              <option value="Expert">Expert</option>
                            </select>
                            <div className="flex space-x-2">
                              <button
                                onClick={handleSaveSkill}
                                className="px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"
                              >
                                Save
                              </button>
                              <button
                                onClick={handleCancelEditSkill}
                                className="px-3 py-1 bg-gray-500 text-white rounded-md text-sm hover:bg-gray-600"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          // Display skill info
                          <>
                            <div>
                              <h3 className="font-medium text-gray-900">{skill.name}</h3>
                              <div className="flex items-center mt-1">
                                <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                                  {skill.level}
                                </span>
                                <span className="ml-2 text-xs text-gray-500">{skill.category}</span>
                                <span className="ml-2 text-xs text-gray-400">{skill.endorsements} endorsements</span>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditSkill(skill)}
                                className="px-3 py-1 text-indigo-600 hover:text-indigo-800 text-sm"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleRemoveSkill(skill.id, activeSkillCategory)}
                                className="px-3 py-1 text-red-600 hover:text-red-800 text-sm"
                              >
                                Remove
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats and Contact Info */}
          <div className="space-y-6">
            {/* Stats Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Stats</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Member since</span>
                  <span className="font-medium">{user.memberSince}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Skill exchanges</span>
                  <span className="font-medium">{user.completedExchanges} completed</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating</span>
                  <span className="font-medium">{user.rating}/5.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Teaching skills</span>
                  <span className="font-medium">{user.skillsToTeach.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Learning skills</span>
                  <span className="font-medium">{user.skillsToLearn.length}</span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact</h2>
              <div className="space-y-2">
                <p className="text-gray-700">{user.email}</p>
                <button className="w-full mt-4 px-4 py-2 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-md hover:bg-indigo-200 transition">
                  Send Message
                </button>
              </div>
            </div>

            {/* Endorsements Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Skill Endorsements</h2>
              <div className="space-y-3">
                {user.skillsToTeach.slice(0, 3).map(skill => (
                  <div key={skill.id} className="flex justify-between items-center">
                    <span className="text-gray-700">{skill.name}</span>
                    <span className="text-sm text-gray-500">{skill.endorsements} endorsements</span>
                  </div>
                ))}
                {user.skillsToTeach.length > 3 && (
                  <button className="w-full mt-2 text-sm text-indigo-600 hover:text-indigo-800">
                    View all endorsements
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the component as the default export
// This allows it to be imported in other files
export default ProfilePage;