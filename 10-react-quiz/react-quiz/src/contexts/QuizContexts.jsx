import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContexts = createContext();

const initialState = {
  questions: [],
  index: 0,

  // loading, ready, error, finished
  status: "loading",
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: 30,
};

const reducerFunc = (state, action) => {
  switch (action.type) {
    case "dataRecieved":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.secondsRemaining * state.questions.length,
      };
    case "newAnswer":
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    case "next":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        highscore: state.highscore,
        status: "ready",
      };
    default:
      throw new Error("Action unknown!");
  }
};
function QuizContextProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducerFunc, initialState);
  const numQuestion = questions.length;
  const totalPointsObtaiable = questions.reduce(
    (acc, cur) => (acc += cur.points),
    0
  );

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <QuizContexts.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        numQuestion,
        totalPointsObtaiable,
        dispatch,
      }}
    >
      {children}
    </QuizContexts.Provider>
  );
}

function useQuizContext() {
  const values = useContext(QuizContexts);

  if (!values)
    throw new Error("Contexts are being used outside of the provider");
  return values;
}

export { QuizContextProvider, useQuizContext };
