function Options({ option, optIndex, dispatch, answer, correctOption }) {
  const hasAnswered = answer !== null
  return (
    <button
      className={`btn btn-option  ${answer === optIndex ? 'answer' : ''} ${hasAnswered ? optIndex === correctOption ? 'correct' : 'wrong' : '' }`}
      onClick={() => dispatch({ type: "newAnswer", payload: optIndex })}
      disabled={hasAnswered}
    >
      {option}
    </button>
  );
}

export default Options;
