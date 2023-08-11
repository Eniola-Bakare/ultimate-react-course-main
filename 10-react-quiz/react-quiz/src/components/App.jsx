import { useEffect, useReducer } from "react";
// import DateCounter from "./DateCounter";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import { useQuizContext } from "../contexts/QuizContexts";

function App() {
  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
    numQuestion,
    totalPointsObtaiable,
    dispatch
  } = useQuizContext();

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
