import React from 'react';

const Total = ({ course }) => {
    const sum = course.parts.reduce(function (accumulator, currentValue) {
      console.log('accumulator', accumulator)
      console.log('currentValue', currentValue)
      console.log('----------------')
  
      return {exercises: accumulator.exercises + currentValue.exercises}
    }).exercises
  
    return(
      <p>Number of exercises {sum}</p>
    ) 
}

export default Total