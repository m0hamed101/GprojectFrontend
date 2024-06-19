import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { storage } from '../../firebase'; // Import Firebase storage configuration
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuthContext } from '../../pages/Login/hooks/useAuthContext';
import Header from '../../components/Header/Header';

export default function Assignment() {
  const { user } = useAuthContext();
  const username = user.name;
  const userId = user.id; // Use the correct user ID from context
  const permission = user.permission;
  const [assignment, setAssignment] = useState(null);
  const [userFile, setUserFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [editUserId, setEditUserId] = useState(''); // State to hold the user ID being edited
  const [editScore, setEditScore] = useState(''); // State to hold the score being edited
  const { courseId, assignmentId } = useParams();

  // Define fetchAssignment outside useEffect
  const fetchAssignment = async () => {
    try {
      const response = await axios.get(`https://gproject-63ye.onrender.com/api/course/${courseId}/assignments/${assignmentId}`);
      setAssignment(response.data);
    } catch (error) {
      console.error('Error fetching assignment:', error);
    }
  };

  // Fetch assignment details from API
  useEffect(() => {
    fetchAssignment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, assignmentId]);

  const handleUserFileChange = (e) => {
    setUserFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!userFile) {
      console.error('No file selected');
      return;
    }

    try {
      setIsUploading(true);
      const storageRef = ref(storage, `assignments/${userFile.name}`);
      await uploadBytes(storageRef, userFile);
      const fileLink = await getDownloadURL(storageRef);
      setIsUploading(false);

      const data = {
        userId,
        username,
        fileLink
      };

      const uploadResponse = await axios.post(`https://gproject-63ye.onrender.com/api/course/${courseId}/assignments/${assignmentId}/upload`, data);
      console.log('Upload response:', uploadResponse.data);

      setUserFile(null);
      fetchAssignment(); // Fetch assignment details again after upload
    } catch (error) {
      setIsUploading(false);
      console.error('Error uploading file:', error);
    }
  };

  const handleDeleteRow = async (userIdToDelete) => {
    try {
      // Make a DELETE request to your backend API to delete the user details
      await axios.delete(`https://gproject-63ye.onrender.com/api/course/${courseId}/assignments/${assignmentId}/user-details/${userIdToDelete}`);
      // Fetch assignment details again to reflect the changes
      fetchAssignment();
    } catch (error) {
      console.error('Error deleting user detail:', error);
    }
  };

  const handleUpdateScore = async (userIdToUpdate, newScore) => {
    try {
      const data = {
        userId: userIdToUpdate,
        userScore: Number(newScore)
      };

      const response = await axios.put(`https://gproject-63ye.onrender.com/api/course/${courseId}/assignments/${assignmentId}/user-details/${userIdToUpdate}`, data);
      console.log('Update score response:', response.data);

      // Fetch assignment details again to reflect the changes
      fetchAssignment();
      // Clear the edit state after successful update
      setEditUserId('');
      setEditScore('');
    } catch (error) {
      console.error('Error updating score:', error);
    }
  };

  if (!assignment) {
    return <div>Loading assignment details...</div>;
  }

  // Filter user details based on search input and permission
  const filteredUserDetails = assignment.assignmentDetails.user_details.filter(userDetail => {
    const searchLowerCase = search.toLowerCase();
    const isMatch = userDetail.username.toLowerCase().includes(searchLowerCase) ||
                    userDetail.id.toString().toLowerCase().includes(searchLowerCase);
    // If permission is admin, include all users; otherwise, filter based on userId
    if (permission === 'admin') {
      return isMatch;
    } else {
      return userDetail.id.toString() === userId.toString() && isMatch;
    }
  });

  return (
    <div>
      <div className="mt-10 flex items-center justify-center h-screen">
        <div className="w-1/2 bg-white shadow-md rounded-lg p-8">
          <h2 className="text-lg font-bold mb-4">Assignment Details</h2>
          <table className="w-full mb-8">
            <tbody>
              <tr>
                <td className="border px-4 py-2">Title:</td>
                <td className="border px-4 py-2 text-gray-800 font-medium">{assignment.title}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">File:</td>
                <td className="border px-4 py-2 text-gray-800 font-medium">
                  <a href={assignment.fileLink} target="_blank" rel="noopener noreferrer">
                    View Assignment File
                  </a>
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">User File:</td>
                <td className="border px-4 py-2">
                  <input
                    type="file"
                    onChange={handleUserFileChange}
                    className="text-gray-800 font-medium"
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2" className="border px-4 py-2 text-center bg-blue-500 text-white font-bold">
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    disabled={isUploading}
                  >
                    {isUploading ? 'Uploading...' : 'Submit Assignment'}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          {/* User Details Table */}
          <h2 className="text-lg font-bold mb-4">User Details</h2>
          {/* Search input */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ID or Username"
            className="px-4 py-2 w-full mb-4 border rounded-md"
          />
          <table className="w-full">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-left">User ID</th>
                <th className="border px-4 py-2 text-left">Username</th>
                <th className="border px-4 py-2 text-left">Score</th>
                <th className="border px-4 py-2 text-left">File Link</th>
                <th className="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUserDetails.map((userDetail) => (
                <tr key={userDetail.id}>
                  <td className="border px-4 py-2">{userDetail.id}</td>
                  <td className="border px-4 py-2">{userDetail.username}</td>
                  <td className="border px-4 py-2">
                    {editUserId === userDetail.id ? (
                      <input
                        type="text"
                        value={editScore}
                        onChange={(e) => setEditScore(e.target.value)}
                        className="text-gray-800 font-medium"
                        placeholder="Enter Score"
                      />
                    ) : (
                      userDetail.user_score
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    <a href={userDetail.filelink} target="_blank" rel="noopener noreferrer">
                      View File
                    </a>
                  </td>
                  <td className="border px-4 py-2">
                    {permission === 'admin' && (
                      <>
                        {editUserId === userDetail.id ? (
                          <button
                            onClick={() => handleUpdateScore(userDetail.id, editScore)}
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 mr-2"
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setEditUserId(userDetail.id);
                              setEditScore(userDetail.user_score);
                            }}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-2"
                          >
                            Edit
                          </button>
                        )}
                      </>
                    )}
                    <button
                      onClick={() => handleDeleteRow(userDetail.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
