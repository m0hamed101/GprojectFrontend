// QuizApp.jsx

import React, { useState, useEffect } from 'react';
import './Quiz.css';
import Header from '../../components/Header/Header';

const questionsData = [
  {
    question: 'What is the capital of France?',
    options: ['Paris', 'Berlin', 'Madrid', 'London'],
    correctAnswer: 'Paris'
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Mars', 'Earth', 'Jupiter', 'Venus'],
    correctAnswer: 'Mars'
  },
  // Add more questions here
];

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [timeLeft, setTimeLeft] = useState(900);

  const totalQuestions = questionsData.length;

  useEffect(() => {
    let timer;
    if (currentQuestion < totalQuestions && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000); // Countdown every 1 second
    }

    return () => clearTimeout(timer);
  }, [currentQuestion, timeLeft]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setTimeLeft(10); // Reset the timer for the new question
  };

  const handleNextQuestion = () => {
    if (selectedOption === questionsData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setSelectedOption('');
    setCurrentQuestion(currentQuestion + 1);
    setTimeLeft(10); // Reset the timer for the new question
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setTimeLeft(10); // Reset the timer for the previous question
    }
  };

  const renderOptions = (options) => {
    return options.map((option, index) => (
      <div
        key={index}
        className={`option ${selectedOption === option ? 'selected' : ''}`}
        onClick={() => handleOptionSelect(option)}
      >
        {option}
      </div>
    ));
  };

  return (
    <div className="quiz-container">
    <Header/>
    <div className="timer m-5">Time left: {timeLeft} seconds</div>
      <div className="question">
        <h2>{questionsData[currentQuestion].question}</h2>
        <div className="options">{renderOptions(questionsData[currentQuestion].options)}</div>
        
        <div className="button-container">
          <button onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
            Previous
          </button>
          {currentQuestion < totalQuestions - 1 ? (
            <button onClick={handleNextQuestion}>Next</button>
          ) : (
            <button disabled>Finish</button>
          )}
        </div>
      </div>
      <div className="quiz-result">
        {currentQuestion === totalQuestions && (
          <div>
            <h2>Quiz Complete!</h2>
            <p>Your Score: {score}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizApp;
