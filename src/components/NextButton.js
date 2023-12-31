import { useQuiz } from "../contexts/QuizContext";

function NextButton() {
  const { dispatch, answer, numQuestions, index } = useQuiz();

  if (answer === null) return null;
  return index + 1 !== numQuestions ? (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      Next
    </button>
  ) : (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "finishedQuiz" })}
    >
      Finish
    </button>
  );
}

export default NextButton;
