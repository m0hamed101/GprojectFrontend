import React from 'react';
import styled from 'styled-components';
import { Card } from '../Card/Card';
import Header from '../Header/Header';

const Container = styled.div`
    padding: 5px;
    border: 1px solid #7986CB;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    justify-content: center;
    align-items: center;
    text-align: center;
`;

export const Courses = ({ courses }) => {
    return (
        <Container className='rounded-lg shadow'>
            {courses?.courses?.map(course => (
                <Card key={course?._id} props={course} />
            ))}
        </Container>
    );
};
