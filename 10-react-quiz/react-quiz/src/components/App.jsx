import { useEffect, useReducer } from "react";
import DateCounter from "../components/DateCounter";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";

const initialState = {
  questions: [],
  index: 0,

  // loading, ready, error, finished
  status: "loading",
};

const reducerFunc = (state, action) => {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "next":
      return { ...state, index: state.index + 1 };
    default:
      throw new Error("Action unknown!");
  }
};
function App() {
  const [{ questions, status,index }, dispatch] = useReducer(
    reducerFunc,
    initialState
  );
  const numQuestion = questions.length;

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
          <Question
            index={index}
            questInfo={questions[index]}
            numQuestion={numQuestion}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
