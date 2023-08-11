import { useEffect, useReducer } from "react";
import DateCounter from "../components/DateCounter";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";

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
function App() {
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
    <div className="app">
      {/* <DateCounter /> */}
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "ready" && (
          <StartScreen numQuestion={numQuestion} dispatch={dispatch} />
        )}
        {status === "error" && <Error />}
        {status === "active" && (
          <>
            <Progress
              index={index}
              totalPointsObtaiable={totalPointsObtaiable}
              numQuestion={numQuestion}
              points={points}
              answer={answer}
            />
            <Question
              index={index}
              questInfo={questions[index]}
              numQuestion={numQuestion}
              answer={answer}
              dispatch={dispatch}
              secondsRemaining={secondsRemaining}
            />
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            totalPointsObtaiable={totalPointsObtaiable}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
