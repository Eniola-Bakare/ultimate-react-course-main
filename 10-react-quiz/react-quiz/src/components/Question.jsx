import { useEffect } from "react";
import Options from "./Options";
import { useQuizContext } from "../contexts/QuizContexts";

function Question() {
  const { questions, index, answer, secondsRemaining, numQuestion, dispatch } =
    useQuizContext();

  useEffect(() => {
    const id = setInterval(() => {
      secondsRemaining > 0
        ? dispatch({ type: "tick" })
        : dispatch({ type: "finish" });
    }, 1000);
    return () => clearInterval(id);
  }, [secondsRemaining, dispatch]);

  const questInfo = questions[index];
  const minute = secondsRemaining / 60;
  const seconds = secondsRemaining % 60;
  return (
    index < numQuestion && (
      <div>
        <h4>{questInfo.question}</h4>
        <div className="options">
          {questInfo.options.map((option, optIndex) => (
            <Options
              option={option}
              key={option}
              optIndex={optIndex}
              dispatch={dispatch}
              answer={answer}
              correctOption={questInfo.correctOption}
            />
          ))}
        </div>
        {answer !== null && index < numQuestion - 1 && (
          <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "next" })}
          >
            Next
          </button>
        )}
        {answer !== null && index === numQuestion - 1 && (
          <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "finish" })}
          >
            Finish
          </button>
        )}
        <div className="timer" onClick={() => dispatch({ type: "tick" })}>
          {minute < 10 ? `0${Math.floor(minute)}` : minute} :{" "}
          {seconds < 10 ? `0${Math.floor(seconds)}` : seconds}
        </div>
      </div>
    )
  );
}

export default Question;
