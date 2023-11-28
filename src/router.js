// import React from 'react'
// import { Navigate, useRoutes } from 'react-router-dom';
// import Home from './pages/Home/Home';
// import CourseDetails from './pages/CourseDetails/CourseDetails'
// import QuizApp from './pages/Quiz/Quiz';
// import { Instructor } from './pages/CourseDetails/Instructor';
// import {Form} from './pages/Login/Form'
// // admin inport
// import {Admin_Courses} from './components/admin/courses/Admin_Courses'
// import {Admin_instructors} from './components/admin/instructors/Admin_instructors'
// import {Admin_users} from './components/admin/users/Admin_users'

// // login
// import { useAuthContext } from './pages/Login/hook/Usecontext'
// import AddUser from './components/admin/users/AddUser/AddUser';



// export default function Router() {
//     const router = useRoutes([

//         // { path: '/', element:!user ? <Form /> : <Home />},
//         // { path: '/user_id', element: <Home /> },
//         { path: '/user_id/CourseDetails', element: <CourseDetails /> },
//         { path: '/user_id/CourseDetails/Instructor', element: <Instructor /> },
//         { path: '/user_id/quizapp', element: <QuizApp /> },

//         //admin router
//         { path: '/Admin_courses', element: <Admin_Courses /> },
//         { path: '/Admin_instructor', element: <Admin_instructors /> },
//         { path: '/Admin_users', element:<Admin_users/> },
//         { path: '/AddUser', element:<AddUser/> },


//     ])
//     return router;
// }
//  // {
//         //     path: '/CourseDetails',
//         //     element: <CourseDetails />,
//         //     children: [
//         //         { path: 'Instructor', element: <Instructor /> }
//         //     ]
//         // },
//                 {/*<Route exact path='/' element={!user ? <Login /> : <Home product={product} />} />*/}
