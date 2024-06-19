import React from 'react';
import './Event.css';
import EventImage from '../../Assets/DataBase.jpg';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

export default function Event({ courses }) {
    const eventData = courses.courses;

    const EventHeader = styled.div`
        width: 100%;
        font-size: large;
        display: flex;
        text-align: center;
        justify-content: center;
        margin-bottom: 10px; /* Added margin for spacing */
    `;

    const EventListWrapper = styled.div`
        max-height: 50vh; /* Set maximum height to 50% of the viewport height */
        overflow-y: auto;
    `;

    return (
        <div>
            <EventHeader>EVENTS</EventHeader>
            <EventListWrapper>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {eventData.map((course) =>
                        course.courseId.materials
                            .filter(material => material.type !== 'lecture') // Filter out lectures
                            .map((material, index) => {
                                let linkTo = '';
                                if (material.type === 'quiz' && material.quizDetails) {
                                    linkTo = `./CourseDetails/${course.courseId._id}/${material.quizDetails._id}`;
                                } else if (material.type === 'assignment') {
                                    linkTo = `./CourseDetails/${course.courseId._id}/assignment/${material._id}`;
                                }

                                return (
                                    <Link to={linkTo} key={index}>
                                        <li className="pb-3 sm:pb-4">
                                            <div className="flex items-center space-x-10">
                                                <div className="flex-shrink-0">
                                                    <img
                                                        className="w-8 h-8 rounded-lg"
                                                        src={EventImage}
                                                        alt="EventImage"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <small className="">11/11/2000</small>
                                                    <small>{course.courseId.courseName}</small>
                                                    <p className="MaterialTitle">
                                                        {material.type === 'quiz' && material.quizDetails ?
                                                            ` Quiz Title: ${material.title}` :
                                                            ` File Title: ${material.title}`}
                                                    </p>
                                                </div>
                                                <div className="EventDate">
                                                    {/* Add date logic here if needed */}
                                                </div>
                                            </div>
                                        </li>
                                    </Link>
                                );
                            })
                    )}
                </ul>
            </EventListWrapper>
        </div>
    );
}
