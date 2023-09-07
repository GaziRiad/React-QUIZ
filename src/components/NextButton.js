function NextButton({ dispatch, answer, numQuestion, index }) {
  if (answer === null) return null;
  return index + 1 !== numQuestion ? (
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
