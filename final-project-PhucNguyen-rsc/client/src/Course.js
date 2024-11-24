import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Course.css'

// const AddButton = () => {
//     const navigate = useNavigate();
//     const add = () =>{
//         navigate('/courses_add');
//     }

//     return (
//         <button onclick={add()}> 
//             Add course
//         </button>
//     );
// }

const SearchCourseForm = () => {
    return (<></>);
}

const ShowCourseForm = () => {
    const location = useLocation();
    const { name, courses } = location.state || {};

    return (
    <div className="course-container">
        <p>Hello {name} !</p>
        <p>Below are your courses this semester: </p>
        <div className="course-stack">
                {courses && courses.map((course, index) => (
                    <div key={index} className="course-card">
                        <h3>{course.name}</h3>
                        <p>Professor: {course.professor}</p>
                        <p>Credits: {course.credits}</p>
                    </div>
                ))}
        </div>
        <p>Edit/ Add courses: </p>
    </div>);
}

export {
    SearchCourseForm,
    ShowCourseForm,
}