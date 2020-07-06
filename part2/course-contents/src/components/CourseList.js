import React from 'react';
import Course from './Course';

const CourseList = ({ courses }) => {
    return (
      <div>
        {courses.map(course => <Course key={course.id} course={course} /> )}
      </div>
    )
}

export default CourseList