import React from "react";  

const Course = ({ course }) => {
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
  );
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
      key={part.id}
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

  let total = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <>
      <p>
        Number of exercises { total }
      </p>
    </>
  );
}

export default Course;