import React from 'react'
import './Event.css'
import EventImage from '../../Assets/DataBase.jpg'
import { styled } from 'styled-components'
import { Link } from 'react-router-dom'

export default function Event() {
    const EventHeader = styled.div`
    width: 100%;
    font-size: large;
    display: flex;
    text-align: center;
    justify-content: center;
    `
    return (
        <div>
            <EventHeader>EVENTS </EventHeader>
            <ul className=" divide-y divide-gray-200 dark:divide-gray-700">

                <Link to={'./Quizapp'}>
                    <li className="pb-3 sm:pb-4">
                        <div className="flex items-center space-x-10">
                            <div className="flex-shrink-0">
                                <img className="w-8 h-8 rounded-lg" src={EventImage} alt="Neil image" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className='EventType'>
                                    quiz
                                </p>
                                <small className="">
                                    2023/12/15 to 2023/12/15
                                </small>
                            </div>
                            <div className="EventDate">
                                <small>
                                    DataBase
                                </small>

                            </div>
                        </div>
                    </li>
                </Link>

                <Link to={'./Quizapp'}>
                    <li className="pb-3 sm:pb-4">
                        <div className="flex items-center space-x-10">
                            <div className="flex-shrink-0">
                                <img className="w-8 h-8 rounded-lg" src={EventImage} alt="Neil image" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className='EventType'>
                                Assignment
                                </p>
                                <small className="">
                                    2023/12/15 to 2023/12/15
                                </small>
                            </div>
                            <div className="EventDate">
                                <small>
                                    InformationSystem
                                </small>

                            </div>
                        </div>
                    </li>
                </Link>

                <Link to={'./Quizapp'}>
                    <li className="pb-3 sm:pb-4">
                        <div className="flex items-center space-x-10">
                            <div className="flex-shrink-0">
                                <img className="w-8 h-8 rounded-lg" src={EventImage} alt="Neil image" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className='EventType'>
                                    quiz
                                </p>
                                <small className="">
                                    2023/12/15 to 2023/12/15
                                </small>
                            </div>
                            <div className="EventDate">
                                <small>
                                    DataBase
                                </small>

                            </div>
                        </div>
                    </li>
                </Link>

                <Link to={'./Quizapp'}>
                    <li className="pb-3 sm:pb-4">
                        <div className="flex items-center space-x-10">
                            <div className="flex-shrink-0">
                                <img className="w-8 h-8 rounded-lg" src={EventImage} alt="Neil image" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className='EventType'>
                                Assignment
                                </p>
                                <small className="">
                                    2023/12/15 to 2023/12/15
                                </small>
                            </div>
                            <div className="EventDate">
                                <small>
                                    InformationSystem
                                </small>

                            </div>
                        </div>
                    </li>
                </Link>

            </ul>


        </div>
    )
}
