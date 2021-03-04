import React from 'react';

const Course = ({ course }) => {

    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
        
      </div>
    )
}

const Header = (props) => {

    const { course } = props
  
    //testattu konsoliin tulostamista
    console.log(course.parts.map(part => part.exercises))
  
    return (
      <h2>{course.name}</h2>
    )
}
  
const Part = ({ part }) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>    
    )
}
  
const Total = ({ course }) => {
  
   //const reducer = (accumulator, currentValue) => accumulator + currentValue;
   //array1.reduce(reducer)
  
    const totalsum = course.parts.reduce((sum, part) => sum + part.exercises, 0) 
  
    return (
      <div>  
        <b>total of {totalsum} exercises</b>
      </div>  
  
    )
 
}
  
const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(part => <Part key={part.id} part={part} />)}           
      </div>
    )
}


export default Course