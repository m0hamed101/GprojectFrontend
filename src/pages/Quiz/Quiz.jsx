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
  const [editing, setEditing] = useState(false);
  const [questionsData, setQuestionsData] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [triesLeft, setTriesLeft] = useState(5);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/quiz/fetchQuestions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            courseId: "65eb56b3e097dd4798932226",
            userId: "65a9b3a1cf24125253783aec",
            quizId: "663238035f5dd141e5bbd828"
          })
        });
        const data = await response.json();
        console.log(data);
        setQuestionsData(data.quizDetails.questions);
        setTimeLeft(data.quizDetails.questions[0].timeLimitMinutes * 60);
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        setIsLoading(false); // Set loading to false on error
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (quizStarted && !quizFinished) {
      setCurrentQuestion(0);
      setScore(0);
      setSelectedOption('');
      setTimeLeft(questionsData[0].timeLimitMinutes * 60);
      setQuizFinished(false);
    }
  }, [quizStarted, quizFinished, questionsData]);

  useEffect(() => {
    if (currentQuestion !== undefined && currentQuestion < questionsData.length && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (currentQuestion !== undefined && currentQuestion < questionsData.length && timeLeft === 0) {
      handleNextQuestion();
    }
  }, [currentQuestion, timeLeft, questionsData]);

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentScore(0);
    setTriesLeft(5);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    const currentQuestionData = questionsData[currentQuestion];
    const isCorrectAnswer = selectedOption === currentQuestionData.answer;

    if (isCorrectAnswer) {
      setScore(score => score + currentQuestionData.points);
      setCurrentScore(currentScore => currentScore + currentQuestionData.points);
    } else {
      setTriesLeft(triesLeft => triesLeft - 1);
    }

    setSelectedOption('');
    setCurrentQuestion(currentQuestion => currentQuestion + 1);

    if (currentQuestion < questionsData.length - 1) {
      setTimeLeft(questionsData[currentQuestion + 1].timeLimitMinutes * 60);
    } else {
      setQuizFinished(true);
    }
  };

  const handleEditing = () => {
    setEditing(!editing);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = [...questionsData];
    updatedQuestions.splice(index, 1);
    setQuestionsData(updatedQuestions);
  };

  const handleAddQuestion = (newQuestion) => {
    setQuestionsData([...questionsData, newQuestion]);
  };

  const renderOptions = () => {
    const question = questionsData[currentQuestion];
    if (question.type === "MCQ") {
      return question.options.map((option, index) => (
        <div
          key={index}
          className={`option ${selectedOption === option.option ? 'selected' : ''}`}
          onClick={() => handleOptionSelect(option.option)}
        >
          {option.option}
        </div>
      ));
    } else if (question.type === "ANSWER") {
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

  return (
    <div>
      <Header />
      <div className="quiz-container">
        {isLoading && <div>Loading...</div>} {/* Show loading message while data is being fetched */}
        {!isLoading && !quizStarted && (
          <div className="button-container">
            <button onClick={handleStartQuiz} style={{border:'solid', padding:'5px'}}>Start Quiz</button>
            <div>Score: {currentScore}</div>
            <div>maxAttempts: {triesLeft}</div>
            <div>userAttempts: {triesLeft}</div>
          </div>
        )}
        {quizStarted && !quizFinished && <div className="timer m-5">Time left: {Math.floor(timeLeft / 60)} minutes</div>}
        <div className="question">
          {currentQuestion !== undefined && questionsData && questionsData.length > 0 && currentQuestion < questionsData.length && (
            <div>
              <h2>{questionsData[currentQuestion].question}</h2>
              <div className="options">{renderOptions()}</div>
            </div>
          )}
          <div className="button-container">
            {quizStarted && (
              <button onClick={handleNextQuestion}>
                {currentQuestion !== undefined && currentQuestion < questionsData.length - 1 ? 'Next' : 'Finish'}
              </button>
            )}
          </div>
        </div>
        <div className="quiz-result">
          {quizFinished && (
            <div>
              <h2>Quiz Complete!</h2>
              <p>Your Score: {score}</p>
            </div>
          )}
        </div>
        {editing && (
          <div>
            <EditComponent
              questionsData={questionsData}
              onDeleteQuestion={handleDeleteQuestion}
              onAddQuestion={handleAddQuestion}
            />
          </div>
        )}
        <button onClick={handleEditing}>{editing ? 'Finish Editing' : 'Edit Questions'}</button>
      </div>
    </div>
  );
};

const EditComponent = ({ questionsData, onDeleteQuestion, onAddQuestion }) => {
  const [questionInput, setQuestionInput] = useState('');
  const [answerInput, setAnswerInput] = useState('');

  const handleQuestionChange = (e) => {
    setQuestionInput(e.target.value);
  };

  const handleAnswerChange = (e) => {
    setAnswerInput(e.target.value);
  };

  const handleSubmit = () => {
    onAddQuestion({ question: questionInput, answer: answerInput, type: "ANSWER", timeLimitMinutes: 20 });
    setQuestionInput('');
    setAnswerInput('');
  };

  return (
    <div>
      {questionsData.map((question, index) => (
        <div key={index} className="question-card">
          <h3>Question: {question.question}</h3>
          <h3>Answer: {question.answer}</h3>
          <button onClick={() => onDeleteQuestion(index)}>Delete</button>
        </div>
      ))}
      <div className="new-question">
        <input
          type="text"
          placeholder="Enter question"
          value={questionInput}
          onChange={handleQuestionChange}
        />
        <input
          type="text"
          placeholder="Enter answer"
          value={answerInput}
          onChange={handleAnswerChange}
        />
        <button onClick={handleSubmit}>Add Question</button>
      </div>
    </div>
  );
};

export default QuizApp;
