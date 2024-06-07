import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Header/Header';
import { Link } from 'react-router-dom';
import Loader from '../../loading/loading';

export const List = ({ contacts, loading, onDelete }) => {

  const [courses, setCourses] = useState([]);
  const [loadingg, setLoadingg] = useState(true);


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`https://gproject-63ye.onrender.com/api/user/getallCourse/65dc8f97fe88127dfcacd337`);

        setCourses(response.data);
        console.log(courses);
        setLoadingg(false);
      } catch (error) {
        console.error('Fetch error:', error);
        setLoadingg(false);
      }
    };

    // Call the fetchCourses function
    fetchCourses();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      {loading ? <Loader /> :
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4"></th>
                <th scope="col" className="px-6 py-3">name</th>
                <th scope="col" className="px-6 py-3">id</th>
                <th scope="col" className="px-6 py-3">year</th>
                <th scope="col" className="px-6 py-3">email</th>
                <th scope="col" className="px-6 py-3">permission</th>
                <th scope="col" className="px-6 py-3">Edit info</th>
                <th scope="col" className="px-6 py-3">Edit courses</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(contact => (
                <tr key={contact._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {contact.name.firstname}
                  </th>
                  <td className="px-6 py-4">
                    {contact.name}
                  </td>
                  <td className="px-6 py-4">
                    {contact.id}
                  </td>
                  <td className="px-6 py-4">
                    {contact.year}
                  </td>
                  <td className="px-6 py-4">
                    {contact.email}
                  </td>
                  <td className="px-6 py-4">
                    {contact.permission}
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`./updateuser/${contact._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link> / <button onClick={() => onDelete(contact._id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Remove</button>
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`./AddCourse/${contact._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Add courses</Link> /
                    <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      type="button" onClick={handleModalOpen}>Delete courses</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </div>
  )
}

export const Admin_users = () => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    const API_URL = 'https://gproject-63ye.onrender.com/api/user/allusers';
    axios.get(API_URL)
      .then(res => {
        const contacts = res.data;
        setContacts(contacts);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredContacts = search.length === 0 ? contacts :
    contacts.filter(contact => contact.id.toString().toLowerCase().includes(search?.toLowerCase()));

  const handleDelete = async (id) => {

    try {
      await axios.delete(`https://gproject-63ye.onrender.com/api/user/deleteuser/${id}`);
      alert("Item deleted successfully")
    } catch (err) {
      console.error('Error deleting item:', err);
    }

  };


  return (
    <div>
      <Header />
      <div style={{ width: "100%", display: "flex", alignItems: 'center', justifyContent: "center" }}>
        <Link to={'./Create_New_User'} style={{ marginTop: '10px' }}>Create New User</Link>
        <input value={search} onChange={(e) => setSearch(e.target.value)} className="m-5 shadow appearance-none border rounded py-2 px-14 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Student ID" />
        <style jsx>{`
        @media (max-width: 768px) {
            div {
                flex-direction: column;
                align-items: center;
            }
            input {
                margin-bottom: 10px;
            }
        }
    `}</style>
      </div>
      <List contacts={filteredContacts} loading={loading} onDelete={handleDelete} />
    </div>
  )
}

export default Admin_users;
