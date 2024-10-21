import { Content } from "./Content";
import { Header } from "./Header";

export const Course = (props) => {
  const { course } = props;
  console.log("dd", course.name);

  return (
    <>
      <Header header={course.name} />
      <Content content={course.parts} />
    </>
  );
};
