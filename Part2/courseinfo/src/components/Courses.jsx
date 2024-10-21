import React from "react";

const Courses = ({ courses }) => {
  return courses.map((c) => {
    return (
      <div key={c.id}>
        <Header header={c.name} />
        <Content content={c.parts} />
        <Total count={c.parts} />
      </div>
    );
  });
};

const Header = ({ header }) => {
  return (
    <>
      <h1>{header}</h1>
    </>
  );
};

const Content = ({ content }) => {
  return (
    <div>
      {content.map((part) => {
        return <Part key={part.id} part={part} />;
      })}
    </div>
  );
};
const Part = ({ part }) => {
  return (
    <>
      <p>
        {part.name} {part.exercises}{" "}
      </p>
    </>
  );
};

const Total = ({ count }) => {
  const intialVal = 0;
  const totalValue = count.reduce((sum, part) => {
    // console.log('what is happening', sum, part)
    return sum + part.exercises;
  }, intialVal);

  return <div>Total {totalValue} exercises </div>;
};

export default Courses;
