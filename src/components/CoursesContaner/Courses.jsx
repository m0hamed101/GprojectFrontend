// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// // import axios from 'axios';
// import { Card } from '../Card/Card';
// import { useAuthContext } from '../../pages/Login/hooks/useAuthContext';
// export const Courses = () => {
//     const { user } = useAuthContext();
//     const [Courses, setCourses] = useState({});
//     const [loading, setLoading] = useState(false);
//     // useEffect(() => {
//     //     const API_URL = `http://localhost:5000/api/user/getCourse/${user._id}`;
//     //     axios
//     //         .get(API_URL)  // Use axios.post since you are sending data in the request body
//     //         .then(res => {
//     //             const course = res.data;
//     //             setCourses(course);
//     //         })
//     //         .finally(() => {
//     //             console.log(courses)
//     //         });
//     // }, [user._id]);
//     useEffect(() => {
//         const fetchCourses = async () => {
//             try {
//                 // Fetch user data by ID
//                 const response = await fetch(`http://localhost:5000/api/user/getCourse/${user._id}`);

//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }

//                 const responseData = await response.json();
//                 setCourses(responseData[0]);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Fetch error:', error);
//                 setLoading(false);
//             }
//         };

//         // Call the fetchCourses function
//         fetchCourses();
//     }, [user._id]);
//     useEffect(() => {
//         console.log(Courses);
//     }, [Courses]);

//     const Container = styled.div`
//         /* border-radius:15px; */
//         padding: 5px;
//         border: 1px solid #7986CB;
//         display: grid;
//         grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//     `;
//     console.log(Courses);
//     return (
//         <Container className='rounded-lg shadow'>
//         {Courses.map(item=>(
//             <h1>{item.name}</h1>
//         ))}
//         </Container>
//     );
// };

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import axios from 'axios';
import { Card } from '../Card/Card';
import { useAuthContext } from '../../pages/Login/hooks/useAuthContext';

export const Courses = () => {
    const { user } = useAuthContext();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(`https://gproject-63ye.onrender.com/api/user/getallCourse/${user._id}`);

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
    }, [user._id]);

    const Container = styled.div`
        /* border-radius:15px; */
        padding: 5px;
        border: 1px solid #7986CB;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    `;


    return (
        <Container className='rounded-lg shadow'>
        {loading ?<div><h1>loading</h1></div>:
        courses?.courses?.map(contact => (
            <Card key={contact?._id} props={contact}/>))
        }
        </Container>
    );
};
// <h1 key={item.id}>{item.name}</h1>
