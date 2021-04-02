import logo from "./logo.svg";
import "./App.css";
import "./index.css";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

function App() {
  const [textValue, setTextValue] = useState("");
  const [randomQuestion, setRandomQuestion] = useState("");
  const [score, setScore] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [counter, setCounter] = useState(5);
  const [giveAnswer, setGiveAnswer] = useState(false);
  const [getCategory, setCategory] = useState();

  const updateQuestion = useCallback(async function () {
    const { data } = await axios.get(`https://jservice.io/api/random`);
    setRandomQuestion(data[0]);
  }, []);

  useEffect(() => {
    updateQuestion();
  }, [updateQuestion]);

  const answer = randomQuestion.answer;
  const categoryey = randomQuestion
    ? randomQuestion.category.title
    : "Loading title...";

  function valueToScore() {
    console.log(randomQuestion.answer);
    if (answer.toLowerCase() === textValue.toLowerCase()) {
      setScore(score + randomQuestion.value);
      setTextValue("");
      setCorrectAnswer(true);
    }
  }

  function givingAnswer() {
    if (counter === 0) {
      return (
        <div className="answerBox">
          <div className={giveAnswer ? "showAnswer" : "hideAnswer"}>
            {answer}
          </div>
          <div>Hover above me, and I reveal the answer!</div>
        </div>
      );
    } else {
      return <div>{counter}</div>;
    }
  }

  useEffect(() => {
    let interval = null;
    if (!correctAnswer && counter !== 0) {
      interval = setInterval(() => {
        if (counter !== 0) {
          setCounter(counter - 1);
        }
        setGiveAnswer(true);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [counter, correctAnswer]);

  function resetHandler() {
    setTextValue("");
    setCorrectAnswer(false);
    setRandomQuestion("");
    updateQuestion();
    setGiveAnswer(false);
    setCounter(5);
  }

  let congrat;
  if (correctAnswer) {
    congrat = <div>CORRECT ANSWER!</div>;
  }

  console.log(getCategory);

  return (
    <div className="App">
      <div>SCORE: {score}</div>
      <header className="App-header">
        <select>{}</select>
        <div>{categoryey}</div>
        <div>{givingAnswer()}</div>
        <img src={logo} className="App-logo" alt="logo" />
        <div>{randomQuestion ? randomQuestion.question : "Loading..."}</div>
        <input
          type="text"
          placeholder="Add answer"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
        ></input>
        <button className="button" onClick={valueToScore}>
          Confirm
        </button>
        <button className="button-2" onClick={resetHandler}>
          Reset / New Question
        </button>
        {congrat}
      </header>
    </div>
  );
}

export default App;
