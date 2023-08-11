import { useQuizContext } from "../contexts/QuizContexts";

function FinishScreen() {
  const { points, totalPointsObtaiable, highscore, dispatch } =
    useQuizContext();
  const percentage = (points / totalPointsObtaiable) * 100;
  return (
    <>
      <p className="result">
        You scored <strong> {points}</strong>/{totalPointsObtaiable},
        {Math.ceil(percentage)}%
      </p>
      <p className="highscore">
        Highscore is: <strong>{highscore}</strong>
      </p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
}

export default FinishScreen;
