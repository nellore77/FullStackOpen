export const Sum = ({ sum }) => {
  const totalVal = sum.reduce((acc, value) => {
    console.log("what is happening", acc, value.exercises);
    return acc + value.exercises;
  },0);

  return (
    <div style={{ fontWeight: "bold" }}>Total of {totalVal} excercises </div>
  );
};
