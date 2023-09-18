import { createContext, useContext, useReducer } from "react";

const QuizContex = createContext();

const SECS_PER_QUESTION = 30;
const initialState = {
  questions: [],

  // 'loading, 'error', 'ready', 'active', 'finished'
  status: "loading",

  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };

    case "quizStart":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };

    case "newAnswer":
      const question = state.questions[state.index];

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "finishedQuiz":
      return {
        ...state,
        status: "finished",
        highscore:
          state.highscore === undefined
            ? localStorage.setItem("highscore", JSON.stringify(state.points))
            : state.highscore > state.points
            ? state.highscore
            : localStorage.setItem("highscore", JSON.stringify(state.points)),
      };

    case "restartQuiz":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
}

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((acc, cur) => acc + cur.points, 0);

  return (
    <QuizContex.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        dispatch,
        numQuestions,
        maxPossiblePoints,
      }}
    >
      {children}
    </QuizContex.Provider>
  );
}

function useQuiz() {
  const value = useContext(QuizContex);
  if (value === undefined)
    throw new Error("QuizContext used outside the QuizProvider");
  return value;
}

export { QuizProvider, useQuiz };
