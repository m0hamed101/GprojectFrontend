import './App.css';
import Router from './router';
import { BrowserRouter,Route,Routes } from 'react-router-dom';


import Home from './pages/Home/Home';
import {Form} from './pages/Login/Form'
// admin import
import {Admin_Courses} from './components/admin/courses/Admin_Courses'
import {Admin_users} from './components/admin/users/Admin_users'
import {AddCourseToUser} from './components/admin/users/AddCourseToUser'
import CourseDetails from './pages/CourseDetails/CourseDetails'

// login
import { useAuthContext } from './pages/Login/hooks/useAuthContext'
import AddUser from './components/admin/users/AddUser/AddUser';
import UpdateUser from './components/admin/users/UpdateUser/UpdateUser';
import Add_Course from './components/admin/courses/Add_course';
import { useEffect, useState } from 'react';


// 320px — 480px: Mobile devices
// 481px — 768px: iPads, Tablets
// 769px — 1024px: Small screens, laptops
// 1025px — 1200px: Desktops, large screens
// 1201px and more —  Extra large screens, TV
function App() {
  
  const {user} =useAuthContext()
  const UserId=user?._id
  console.log(UserId);

  const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    
    useEffect(() => {
      const fetchCourses = async () => {
          try {
              // const response = await fetch(`http://localhost:5000/api/user/getCourse/${UserId}`);
              const response = await fetch(`https://gproject-63ye.onrender.com/api/user/getCourse/${UserId}`);

              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }

              const responseData = await response.json();
              setCourses(responseData);
              setLoading(false);
          } catch (error) {
              console.error('Fetch error:', error);
              setLoading(false);
          }
      };

      // Call the fetchCourses function
      fetchCourses();
  }, [UserId]);

  useEffect(() => {
      // console.log("fetching");
      // console.log(courses[0]);
  }, [courses]);

  
  return (
    <BrowserRouter>
    <Routes>
          <Route exact path='/' element={user?<Home/>: <Form />} />
          <Route exact path='/CourseDetails/:_id' element={user?<CourseDetails/>: <Form />} />
          <Route  path='/Admin_users'element={user?<Admin_users/>: <Form />} />
          <Route  path='/Admin_users/Create_New_User'element={user?<AddUser/>: <Form />} />

          <Route  path='/Admin_courses'element={user?<Admin_Courses/>: <Form />} />
          <Route  path='/Admin_courses/Create_New_Course'element={user?<Add_Course/>: <Form />} />

          <Route  path='/Admin_users/updateuser/:id'element={user?<UpdateUser/>: <Form />} />
          <Route  path='/Admin_users/AddCourse/:id'element={user?<AddCourseToUser/>: <Form />} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;
