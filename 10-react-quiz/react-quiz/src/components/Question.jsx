import Options from "./Options";

function Question({ questInfo, index, dispatch, numQuestion, answer }) {
  console.log(questInfo);
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
      </div>
    )
  );
}

export default Question;
