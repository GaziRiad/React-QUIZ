import { useQuiz } from "../contexts/QuizContext";
import Options from "./Options";

function Question() {
  const { questions, index } = useQuiz();
  return (
    <div>
      <h4>{questions[index].question}</h4>
      <Options />
    </div>
  );
}

export default Question;
