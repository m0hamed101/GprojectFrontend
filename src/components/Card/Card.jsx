import React from 'react'
import styled from 'styled-components'
import courseimage from '../../Assets/DataBase.jpg'
import { Link } from 'react-router-dom';
export const Card = ({props}) => {
    return (
        <Link style={{width:"100%"}} to={'./CourseDetails/'+props.courseId?._id}>
            <div style={{maxWidth:"300px"}} className=" rounded-lg shadow  m-2 p-1">
                <img style={{maxWidth:"100%"}} className="rounded-lg" src={props.courseId?.ImageURL} alt="" />
                <div className="p-5">
                    <Link to={"/"}>
                        <h1 className="mb-2 dark:text-white" style={{ color: '#000' }}>CourseName : {props.courseId?.courseName}</h1>
                    </Link>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">DISCREPTION : Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    <div style={{ border: "#000 solid 1px", borderRadius: '5px', padding: '5px', color: 'white', backgroundColor: 'black' }}>
                        Doc :  {props.courseId?.DocName}
                    </div>
                </div>
            </div>
            
        </Link>
    )
}
