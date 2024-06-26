import { useState } from "react";
const App = () => {
 

  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    total: 0,
  });

  const handleGood = () => {
    const updatedGood = feedback.good + 1;
    const total = feedback.bad + feedback.neutral + updatedGood;

    setFeedback({
      ...feedback,
      good: updatedGood,
      total: total,
    });
    // setTotal(feedback.bad + feedback.neutral + updatedGood);
  };

  const handleNeutral = () => {
    const updatedN = feedback.neutral + 1;
    const total = feedback.bad + feedback.good + updatedN;
    setFeedback({
      ...feedback,
      neutral: updatedN,
      total: total,
    });
  };

  const handleBad = () => {
    const updatedB = feedback.bad + 1;
    const total = feedback.good + feedback.neutral + updatedB;
    setFeedback({
      ...feedback,
      bad: updatedB,
      total: total,
    });
  };
  return (
    <div>
      <h2>Give feedback</h2>
      <Button handleClick={handleGood} text={"good"} />
      <Button handleClick={handleNeutral} text={"neutral"} />
      <Button handleClick={handleBad} text={"bad"} />

      {/* <h2>Statistics</h2> */}
<Stats/>
      <Statistics value={feedback} />
    </div>
  );
};
const Stats=()=>{
  return(
    <h2>statistics</h2>
  )
}
const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};
const Count = (props) => {
  return (
    <p>
      {props.text} {props.count}{" "}
    </p>
  );
};

const Statistics = (props) => {
  console.log("props ", props);
  if (props.value.total == 0) {
    return <div>No Feedback given</div>;
  } else {
    return (
      <table>
        <StatisticLine text="good" value={props.value.good} />
        <StatisticLine text="neutral" value={props.value.neutral} />
        <StatisticLine text="bad" value={props.value.bad} />
        <StatisticLine text="all" value={props.value.total} />
        <StatisticLine text="Average" value={(props.value.good-props.value.bad)/(props.value.good+props.value.bad+props.value.neutral)} />
        <StatisticLine text="Positive"  value={(props.value.good*100)/(props.value.good+props.value.bad+props.value.neutral)+ " %"}  />
      </table>
    );
  }
};

const StatisticLine = (props) => {
  console.log("val ", props.value);
  return (
      <tbody>
        <tr>
          <td>{props.text} </td>

          <td>{props.value}</td>
        </tr>
      </tbody>
  );
};

export default App;
