function Progress({
  index,
  numQuestion,
  totalPointsObtaiable,
  points,
  answer,
}) {
  return (
    <header className="progress">
      <progress max={numQuestion} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index < numQuestion ? index + 1 : index}</strong>/
        {numQuestion}
      </p>
      <p>
        <strong>{points}</strong>/{totalPointsObtaiable}
      </p>
    </header>
  );
}

export default Progress;
