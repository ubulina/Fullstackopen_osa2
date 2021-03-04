import React from 'react';
import ReactDOM from 'react-dom';
import Course from './components/Course'


const Courses = ({ courses }) => {

  return (
    <div>
      {courses.map(course => <Course key ={course.id} course={course} />)}

    </div>
  )

}


const App = () => {
  const courses = [
  
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 15,
          id: 3
        },
        {
          name: 'Testing the code',
          exercises: 17,
          id: 4
        },

      ]
    },

    {

      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
            name: 'Middlewares',
            exercises: 7,
            id: 2
        }
      ]

    }

  ]
  return (
    <div>
      <h1>Web development curriculum</h1>
      <Courses courses={courses} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
