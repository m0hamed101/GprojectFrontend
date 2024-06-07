import React, { useState, useEffect } from 'react';
import './Quiz.css';
import Header from '../../components/Header/Header';

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizDetails, setQuizDetails] = useState(null);
  const [currentScore, setCurrentScore] = useState(0);
  const [triesLeft, setTriesLeft] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [userAttempts, setUserAttempts] = useState(0);
  const [maxAttempts, setMaxAttempts] = useState(0);
  const [logData, setLogData] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [totalQuizTime, setTotalQuizTime] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/quiz/fetchQuestions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            courseId: '65eb56b3e097dd4798932226',
            userId: '65a9b3a1cf24125253783aec',
            quizId: '663238035f5dd141e5bbd828',
          }),
        });
        const data = await response.json();
        console.log(data);

        if (data.quizDetails && data.quizDetails.quizDetails) {
          setQuizDetails(data.quizDetails.quizDetails);
          setScore(data.score);
          setUserAttempts(data.userAttempts);
          setMaxAttempts(data.quizDetails.quizDetails.maxAttempts);
          setTimeLeft(data.quizDetails.quizDetails.timeLimitMinutes * 60);
        } else {
          console.error('Quiz details are not defined in the response:', data);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let timer;
    if (quizStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && quizStarted) {
      handleNextQuestion();
    }
    return () => clearInterval(timer);
  }, [timeLeft, quizStarted]);

  const handleStartQuiz = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/quiz/incrementUserAttempts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: '65eb56b3e097dd4798932226',
          userId: '65a9b3a1cf24125253783aec',
          quizId: '663238035f5dd141e5bbd828',
        }),
      });
      const data = await response.json();
      console.log('Incremented user attempts:', data.userAttempts);

      if (response.ok) {
        setQuizStarted(true);
        setCurrentScore(0);
        setTriesLeft(maxAttempts);
        setTimeLeft((quizDetails.timeLimitMinutes || 0) * 60);
        setStartTime(Date.now());
      } else {
        console.error('Failed to increment user attempts');
      }
    } catch (error) {
      console.error('Error starting quiz:', error);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = async () => {
    const currentQuestionData = quizDetails.questions[currentQuestion];
    const isCorrectAnswer = selectedOption === currentQuestionData.right_answer;

    const logEntry = {
      id: currentQuestionData._id,
      model_answer: currentQuestionData.right_answer,
      student_answer: selectedOption,
    };

    setLogData((prevLogData) => [...prevLogData, logEntry]);

    if (isCorrectAnswer) {
      setScore(score + currentQuestionData.points);
      setCurrentScore(currentScore + currentQuestionData.points);
    } else {
      setTriesLeft(triesLeft - 1);
    }

    setSelectedOption('');
    if (currentQuestion < quizDetails.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft((quizDetails.timeLimitMinutes || 0) * 60);
    } else {
      handleQuizCompletion();
    }
  };

  const handleQuizCompletion = async () => {
    setQuizFinished(true);
    setEndTime(Date.now());

    const totalTimeSeconds = Math.floor((Date.now() - startTime) / 1000);
    setTotalQuizTime((prevTime) => prevTime + totalTimeSeconds);

    // Print the accumulated logData to verify
    console.log(JSON.stringify({ data: logData }, null, 2));

    // Send log data to the prediction API
    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: logData }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const predictionResult = await response.json();
      // Print the complete predictionResult
      console.log('Prediction Result:', predictionResult);
    } catch (error) {
      console.error('Error predicting:', error);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption('');
      setTimeLeft((quizDetails.timeLimitMinutes || 0) * 60);
    }
  };

  const renderOptions = () => {
    const question = quizDetails?.questions[currentQuestion];
    if (question && question.type === 'MCQ') {
      return question.options.map((option, index) => (
        <div
          key={index}
          className={`option ${selectedOption === option.option ? 'selected' : ''}`}
          onClick={() => handleOptionSelect(option.option)}
        >
          {option.option}
        </div>
      ));
    } else if (question && question.type === 'ANSWER') {
      return (
        <input
          type="text"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          placeholder="Type your answer here..."
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      );
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div>
      <Header />
      <div className="quiz-container">
        {isLoading && <div>Loading...</div>}
        {!isLoading && !quizStarted && (
          <div className="button-container">
            <div>Max Attempts: {maxAttempts}</div>
            <button
              onClick={handleStartQuiz}
              style={{
                border: 'solid',
                padding: '5px',
                backgroundColor: userAttempts >= maxAttempts ? '#cccccc' : '#007bff',
                color: '#ffffff',
                cursor: userAttempts >= maxAttempts ? 'not-allowed' : 'pointer',
              }}
              disabled={userAttempts >= maxAttempts}
            >
              Start Quiz
            </button>
            <div>Score: {score}</div>
            <div>User Attempts: {userAttempts}</div>
            <div>Total Quiz Time: {formatTime(totalQuizTime)}</div>
          </div>
        )}
        {quizStarted && !quizFinished && (
          <div className="quiz-body">
            <div className="timer">Time Left: {formatTime(timeLeft)}</div>
            <div className="question-container">
              <div className="question">{quizDetails.questions[currentQuestion].question}</div>
              <div className="options">{renderOptions()}</div>
            </div>
            <div className="button-container">
              <button onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>Previous Question</button>
              <button onClick={handleNextQuestion}>Next Question</button>
            </div>
          </div>
        )}
        {quizFinished && (
          <div className="quiz-result">
            <h2>Quiz Complete!</h2>
            <p>Your Score: {score}</p>
            <p>Total Quiz Time: {formatTime(totalQuizTime)}</p>
            <pre>{JSON.stringify({ data: logData }, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizApp;
