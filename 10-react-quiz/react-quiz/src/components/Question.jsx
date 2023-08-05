import Options from "./Options";

function Question({ questInfo, index, dispatch, numQuestion }) {
  console.log(questInfo);
  return (
    index < numQuestion && (
      <div>
        <h4>{questInfo.question}</h4>
        <div className="option">
          {
            questInfo.options.map(option => <Options option={option} key={option}/>)
          }
        </div>
        <button className="btn" onClick={() => dispatch({ type: "next" })}>
          Next
        </button>
      </div>
    )
  );
}

export default Question;
