import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card } from '../Card/Card';
import { useAuthContext } from '../../pages/Login/hooks/useAuthContext';
import Loader from '../loading/loading';

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
        padding: 5px;
        border: 1px solid #7986CB;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        justify-content: center;
        align-items: center;
        text-align: center;
    `;


    return (
        <Container className='rounded-lg shadow'>
        {loading ?<Loader/>:
        courses?.courses?.map(contact => (
            <Card key={contact?._id} props={contact}/>))
        }
        </Container>
    );
};