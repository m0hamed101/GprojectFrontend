import React from 'react';
import { Link } from 'react-router-dom';

export const Card = ({ props }) => {
    const { courseId } = props;
    return (
        <Link style={{ width: "100%" }} to={'./CourseDetails/' + courseId?._id}>
            <div style={{ maxWidth: "300px" }} className="rounded-lg shadow m-2 p-1">
                <img style={{ maxWidth: "100%" }} className="rounded-lg" src={courseId?.ImageURL} alt="" />
                <div className="p-5">
                    <h1 className="mb-2 dark:text-white" style={{ color: '#000' }}>{courseId?.courseName}</h1>
                    <div style={{ border: "#000 solid 1px", borderRadius: '5px', padding: '5px', color: 'black' }}>
                        {courseId?.DocName}
                    </div>
                </div>
            </div>
        </Link>
    );
};
