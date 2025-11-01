function FinishScreen({ score, maxPossibleScore, highscore, dispatch }) {
  return (
    <>
      <p className="result">
        You scored <strong>{score}</strong> out of {maxPossibleScore} points (
        {Math.ceil((score / maxPossibleScore) * 100)}%).
      </p>
      <p className="highscore">Highscore: {highscore} points</p>
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
