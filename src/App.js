import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import Home from './pages/Home/Home';
import { Form } from './pages/Login/Form'
// admin import
import { Admin_Courses } from './components/admin/courses/Admin_Courses'
import { Admin_users } from './components/admin/users/Admin_users'
import { AddCourseToUser } from './components/admin/users/AddCourseToUser'
import CourseDetails from './pages/CourseDetails/CourseDetails'

// login
import { useAuthContext } from './pages/Login/hooks/useAuthContext'
import AddUser from './components/admin/users/AddUser/AddUser';
import UpdateUser from './components/admin/users/UpdateUser/UpdateUser';
import Add_Course from './components/admin/courses/Add_course';
import QuizApp from './pages/Quiz/Quiz';
import Assignment from './pages/assignment/Assignment';
import Edit_quiz from './pages/Quiz/Edit_quiz';
import Header from './components/Header/Header';


// 320px — 480px: Mobile devices
// 481px — 768px: iPads, Tablets
// 769px — 1024px: Small screens, laptops
// 1025px — 1200px: Desktops, large screens
// 1201px and more —  Extra large screens, TV
function App() {

  const { user } = useAuthContext()
    const User = user?.permission

  return (
    <BrowserRouter>
    {
          (User === "user"||User === "instructor"||User === "admin")&&
    (<Header/>)}
      <Routes>
        <Route exact path='/' element={user ? <Home /> : <Form />}/>
        <Route exact path='/CourseDetails/:course/:_id' element={user ? <QuizApp/> : <Form />} />
        <Route exact path='/CourseDetails/:courseId/assignment/:assignmentId' element={user ? <Assignment/> : <Form />} />
        <Route exact path='/CourseDetails/:courseId/edit_quiz/:_id' element={user ? <Edit_quiz/> : <Form />} />
        <Route exact path='/CourseDetails/:id' element={user ? <CourseDetails /> : <Form />} />
        <Route path='/Admin_users' element={user ? <Admin_users /> : <Form />} />
        <Route path='/Admin_users/Create_New_User' element={user ? <AddUser /> : <Form />} />

        <Route path='/Admin_courses' element={user ? <Admin_Courses /> : <Form />} />
        <Route path='/Admin_courses/Create_New_Course' element={user ? <Add_Course /> : <Form />} />

        <Route path='/Admin_users/updateuser/:id' element={user ? <UpdateUser /> : <Form />} />
        <Route path='/Admin_users/AddCourse/:id' element={user ? <AddCourseToUser /> : <Form />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
