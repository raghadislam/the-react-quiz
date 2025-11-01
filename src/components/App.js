import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Footer from "./Footer";

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: "loading", // 'loading', 'ready', 'active', 'finished', 'error'
  currentQuestionIndex: 0,
  answer: null,
  score: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "startQuiz":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.currentQuestionIndex);
      const isCorrect = action.payload === question.correctOption;

      return {
        ...state,
        answer: action.payload,
        score: isCorrect ? state.score + question.points : state.score,
      };
    case "nextQuestion":
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.score > state.highscore ? state.score : state.highscore,
      };
    case "restart":
      return {
        ...state,
        status: "ready",
        currentQuestionIndex: 0,
        answer: null,
        score: 0,
        secondsRemaining: 10,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
        highscore:
          state.score > state.highscore ? state.score : state.highscore,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

export default function App() {
  const [
    {
      questions,
      status,
      currentQuestionIndex,
      answer,
      score,
      highscore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossibleScore = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((error) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={currentQuestionIndex}
              numQuestions={numQuestions}
              score={score}
              maxPossibleScore={maxPossibleScore}
              answer={answer}
            />
            <Question
              question={questions[currentQuestionIndex]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                answer={answer}
                dispatch={dispatch}
                index={currentQuestionIndex}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            score={score}
            maxPossibleScore={maxPossibleScore}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
