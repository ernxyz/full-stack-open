import React from 'react';

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header 
        course={course.name}
      />
      <Content 
        parts={course.parts}
      />
      <Total 
        parts={course.parts}
      />
    </div>
  )
}

const Header = ({ course }) => {

  return (
    <>
      <h1>{course}</h1>
    </>
  );
}

const Content = ({ parts }) => {

  const data = parts.map((part) => (
    <Part
      part={part}
    />
  ));

  return (
    <>
      {data}
    </>
  );
};

const Part = ({part}) => {

  return(
    <p>{part.name} {part.exercises}</p>
  );
}

const Total = ({ parts }) => {

  let total = 0;

  parts.forEach(n => {
    total += n.exercises
  })

  return (
    <>
      <p>
        Number of exercises { total }
      </p>
    </>
  );
}

export default App
