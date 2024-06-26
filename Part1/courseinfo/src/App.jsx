const App = () => {

  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 33,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      {" "}
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total count={course.parts} />
    </div>
  );
};
const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};
const Content = (props) => {
  const parts = props.parts;
  return (
    <>
      <Part part={parts[0].name} exercises={parts[0].exercises} />
      <Part part={parts[1].name} exercises={parts[1].exercises} />
      <Part part={parts[2].name} exercises={parts[2].exercises} />
    </>
  );
};
const Part = (props) => {
  return (
    <>
      <p>
        {props.part} :{props.exercises}
      </p>
    </>
  );
};
const Total = (props) => {
  console.log(props.count);
  return (
    <>
      <p>
        Number of exercises:{" "}
        {props.count[0].exercises +
          props.count[1].exercises +
          props.count[2].exercises}
      </p>
    </>
  );
};
export default App;
