import React, { useState, useEffect } from 'react';
import { Input } from '@mui/base/Input';

import axios from 'axios';
import Header from '../../Header/Header';
import { Link } from 'react-router-dom';
// import List from './List';


export const List = ({ contacts }, { loading }) => {
  // const UserDATA=contacts._id
  // console.log(contacts);
  return (
    <div>
      {loading ? <div>fetching Data .....</div>
        :

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                </th>
                <th scope="col" className="px-6 py-3">
                  name
                </th>
                <th scope="col" className="px-6 py-3">
                  id
                </th>
                <th scope="col" className="px-6 py-3">
                  year
                </th>
                <th scope="col" className="px-6 py-3">
                  email
                </th>
                <th scope="col" className="px-6 py-3">
                  _id
                </th>
                <th scope="col" className="px-6 py-3">
                  permission
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
                <th scope="col" className="px-6 py-3">
                ADD
                </th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(contact => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
                    {contact._id}
                  </td>
                  <td className="px-6 py-4">
                    {contact.permission}
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`./updateuser/${contact._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`./AddCourse/${contact._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">ADD</Link>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
            {/*<nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of <span className="font-semibold text-gray-900 dark:text-white">1000</span></span>
            <ul className="inline-flex -space-x-px text-sm h-8">
              <li>
                <Link to={"/"} className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</Link>
              </li>
              <li>
                <Link to={"/"} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</Link>
              </li>
              <li>
                <Link to={"/"} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</Link>
              </li>
              <li>
                <Link to={"/"} aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</Link>
              </li>
              <li>
                <Link to={"/"} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</Link>
              </li>
              <li>
                <Link to={"/"} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</Link>
              </li>
              <li>
                <Link to={"/"} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</Link>
              </li>
            </ul>
              </nav>*/}
            
        </div>


      }

    </div>
  )
}

export const Admin_users = () => {
  const [contacts, setContacts] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    setLoading(true)
    // const API_URL = 'https://fakestoreapi.com/users'
    // const API_URL = 'http://localhost:5000/api/user/allusers'
    const API_URL = 'https://gproject-63ye.onrender.com/api/user/allusers'
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
      contact.id.toString().toLowerCase().includes(search?.toLowerCase()))



  return (
    <div>
      <Header/>
      <div style={{ width: "100%", display: "flex", alignItems: 'center', justifyContent: "center" }}>
      <input value={search} onChange={(e) => setSearch(e.target.value)} className=" m-5 shadow appearance-none border rounded py-2 px-14 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Student ID"/>
  <Link to={'./Create_New_User'}>Create New User</Link>
        {/*<h3>CONTACTS LIST</h3>
        <Input style={{ margin: '15px' }}
          placeholder="Search name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />*/}
      </div>

      <List contacts={filteredContacts} loading={loading} />
    </div>
  )
}

// <ul>
// {contacts.map(contact => (
//   <li className='m-5' key={contact.id}>
//     Name:
//     <span>{contact.full_name}</span>
//     Phone:
//     <span>{contact.tel}</span>
//   </li>
// ))}
// </ul>