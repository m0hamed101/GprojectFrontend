import React, { useEffect, useState } from 'react'

import axios from 'axios';
import Header from '../../Header/Header';
import { Link } from 'react-router-dom';

export const List = ({ contacts, loading,onDelete }) => {
  const UserDATA=contacts._id
  // console.log(contacts);
  return (
    <div>
      {loading ? <div>fetching Data .....</div>
        :

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Course name
                </th>
                <th scope="col" className="px-6 py-3">
                  DocName
                </th>
                <th scope="col" className="px-6 py-3">
                  Edit
                </th>
                <th scope="col" className="px-6 py-3">
                  remove
                </th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(contact => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {contact.courseName}
                  </th>
                  <td className="px-6 py-4">
                    {contact.DocName}
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`/CourseDetails/${contact._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                  </td>
                  <td className="px-6 py-4">
                  <button onClick={() => onDelete(contact._id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Remove</button>
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

export const Admin_Courses = () => {
  const [contacts, setContacts] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    setLoading(true)
    const API_URL = 'https://gproject-63ye.onrender.com/api/course/allcourse'
    axios
      .get(API_URL)
      .then(res => {
        const contacts = res.data
        setContacts(contacts)
      }).finally(() => { setLoading(false) })
  }, [])

  const filteredContacts = search.length === 0 ? contacts :
    // contacts.filter(contact => contact.id)
    contacts.filter(contact =>
      contact.courseName.toString().toLowerCase().includes(search?.toLowerCase()))

      const handleDelete = async (id) => {

        try {
          await axios.delete(`https://gproject-63ye.onrender.com/api/user/deletecourses/${id}`);
          // Handle success, maybe update state or show a notification
          // console.log('Item deleted successfully');
          alert("Item deleted successfully")
        } catch (err) {
          // Handle error, maybe show an error message
          console.error('Error deleting item:', err);
        }
        
      };

  return (
    <div>
      <Header/>
      <div style={{ width: "100%", display: "flex", alignItems: 'center', justifyContent: "center" }}>
      <input value={search} onChange={(e) => setSearch(e.target.value)} className=" m-5 shadow appearance-none border rounded py-2 px-14 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Course Name"/>
  <Link to={'./Create_New_Course'}>Create New Courses</Link>
        {/*<h3>CONTACTS LIST</h3>
        <Input style={{ margin: '15px' }}
          placeholder="Search name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />*/}
      </div>

      <List contacts={filteredContacts} loading={loading} onDelete={handleDelete} />
    </div>
  )
}