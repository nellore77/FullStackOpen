import { Part } from "./Part";
import { Sum } from "./Sum";

export const Content = ({ content }) => {
  return (
    <div>
      {content.map((part) => {
        return <Part key={part.id} part={part} />;
      })}
      <Sum sum ={content} />
    </div>
  );
};
