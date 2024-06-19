import React, { useState, useEffect } from 'react';
import './Quiz.css';
import { storage } from "../../firebase";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { useAuthContext } from '../../pages/Login/hooks/useAuthContext'
import { useParams } from 'react-router-dom'; // Import useParams



const QuizApp = () => {
  const { course, _id } = useParams(); // Extract courseId and quizId from URL parameters
  const [UserAttempts, setUserAttempts] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizDetails, setQuizDetails] = useState(null);
  const [logData, setLogData] = useState([]);
  const [totalSimilarity, setTotalSimilarity] = useState(0);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [file, setFile] = useState(null);
  const [fileLink, setFileLink] = useState("");
  const [fileUploaded, setFileUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [previousAnswers, setPreviousAnswers] = useState({});
  const { user } = useAuthContext()
  // console.log(user._id);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://gproject-63ye.onrender.com/api/quiz/fetchQuestions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              courseId:course,
              userId:user._id,
              quizId:_id,
            }),
          }
        );
        const data = await response.json();
        console.log("Fetched data:", data);
        if (data.quizDetails && data.quizDetails.quizDetails) {
          setQuizDetails(data.quizDetails.quizDetails);
          setUserAttempts(data.userAttempts);
          setTimeLeft(data.quizDetails.quizDetails.timeLimitMinutes * 60);
          setPreviousAnswers(data.previousAnswers);
        } else {
          console.error("Quiz details are not defined in the response:", data);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
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
    } else if (timeLeft === 0 && quizStarted && !quizFinished) {
      handleQuizCompletion();
    }
    return () => clearInterval(timer);
  }, [timeLeft, quizStarted, quizFinished]);

  const handleStartQuiz = async () => {
    try {
      const response = await fetch(
        "https://gproject-63ye.onrender.com/api/quiz/incrementUserAttempts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseId: "65eb56b3e097dd4798932226",
            userId: "65a9b3a1cf24125253783aec",
            quizId: "663238035f5dd141e5bbd828",
          }),
        }
      );
      const data = await response.json();
      console.log("Incremented user attempts:", data.userAttempts);
      if (response.ok) {
        setQuizStarted(true);
        setTimeLeft((quizDetails.timeLimitMinutes || 0) * 60);
      } else {
        console.error("Failed to increment user attempts");
      }
    } catch (error) {
      console.error("Error starting quiz:", error);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextOrFinish = async () => {
    const currentQuestionData = quizDetails.questions[currentQuestion];
    const logEntry = {
      id: currentQuestionData._id,
      model_answer: currentQuestionData.right_answer,
      student_answer: selectedOption,
      url: fileLink,
      question: currentQuestionData.question,
    };

    switch (currentQuestionData.type) {
      case "MCQ":
      case "ANSWER":
        break;
      case "SOUND":
        logEntry.student_answer_url = fileLink;
        break;
      case "FILE":
        logEntry.url = fileLink;
        break;
      default:
        console.error(
          `Unsupported question type: ${currentQuestionData.type}`
        );
        return;
    }

    setLogData((prevLogData) => [...prevLogData, logEntry]);

    setSelectedOption("");

    if (currentQuestion === quizDetails.questions.length - 1) {
      setQuizFinished(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft((quizDetails.timeLimitMinutes || 0) * 60);
    }
  };

  const handleQuizCompletion = async () => {
    const formattedLogData = [];

    logData.forEach((logEntry) => {
      const currentQuestionData = quizDetails.questions.find(
        (question) => question._id === logEntry.id
      );

      if (!currentQuestionData) {
        console.error(`Question data not found for ID: ${logEntry.id}`);
        return;
      }

      switch (currentQuestionData.type) {
        case "MCQ":
        case "ANSWER":
          formattedLogData.push({
            id: logEntry.id,
            model_answer: logEntry.model_answer,
            student_answer: logEntry.student_answer,
            question: logEntry.question,
          });
          break;

        case "SOUND":
          formattedLogData.push({
            id: logEntry.id,
            model_answer: currentQuestionData.right_answer,
            student_answer_url: logEntry.student_answer_url,
            question: logEntry.question,
          });
          break;

        case "FILE":
          formattedLogData.push({
            id: logEntry.id,
            url: logEntry.url,
            question: logEntry.question,
          });
          break;

        default:
          console.error(
            `Unsupported question type: ${currentQuestionData.type}`
          );
          break;
      }
    });

    console.log("Formatted Log Data:", formattedLogData);

    setFileUploaded(false);
    setSubmitClicked(true);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(
        previousAnswers[currentQuestion - 1]?.student_answer || ""
      );
      setTimeLeft((quizDetails.timeLimitMinutes || 0) * 60);
    }
  };

  const renderOptions = () => {
    const question = quizDetails?.questions?.[currentQuestion];
    if (!question) return null;
    switch (question.type) {
      case "MCQ":
        return question.options.map((option, index) => (
          <div
            key={index}
            className={`option ${
              selectedOption === option.option ? "selected" : ""
            } className="selected-option`}
            onClick={() => handleOptionSelect(option.option)}
          >
            {option.option}
          </div>
        ));
      case "ANSWER":
        return (
          <input
            type="text"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            placeholder="Type your answer here..."
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
        );
      case "SOUND":
        return (
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Upload Sound File
            </label>
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              disabled={uploading}
            />
            {fileUploaded && (
              <p className="text-green-500 font-semibold">
                Sound file uploaded successfully!
              </p>
            )}
            {uploading && (
              <p className="text-yellow-500 font-semibold">
                Sound file is uploading...
              </p>
            )}
            <button
              onClick={handleFileUpload}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
              disabled={!file || uploading}
            >
              {uploading ? 'Uploading...' : 'Upload Sound File'}
            </button>
          </div>
        );

      case "FILE":
        return (
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Upload File
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
              onChange={handleFileChange}
              disabled={uploading}
            />
            {fileUploaded && (
              <p className="text-green-500 font-semibold">
                File uploaded successfully!
              </p>
            )}
            {uploading && (
              <p className="text-yellow-500 font-semibold">
                File is uploading...
              </p>
            )}
            <button
              onClick={handleFileUpload}
              className="bg
-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
              disabled={!file || uploading}
            >
              {uploading ? 'Uploading...' : 'Upload File'}
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleFileUpload = async () => {
    if (!file) return;

    try {
      setUploading(true);

      // Create a storage reference
      const storageRef = ref(storage, `quiz/files/${file.name}`);

      // Upload file
      const uploadTask = await uploadBytes(storageRef, file);

      // Get download URL
      const downloadURL = await getDownloadURL(uploadTask.ref);
      console.log('File uploaded successfully:', downloadURL);
      setFileLink(downloadURL);
      setFileUploaded(true);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  const renderQuestion = () => {
    if (!quizDetails || !quizDetails.questions || quizDetails.questions.length === 0) {
      return (
        <div className="quiz-loading">
          Loading...
        </div>
      );
    }

    const question = quizDetails.questions[currentQuestion];
    return (
      <div className="question-container">
        <div className="question-text">
          {question.question}
        </div>
        <div className="options-container">
          {renderOptions()}
        </div>
        <div className="navigation-buttons">
          <button
            onClick={handlePreviousQuestion}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            disabled={currentQuestion === 0}
          >
            Previous
          </button>
          <button
            onClick={handleNextOrFinish}
            className={`${
              currentQuestion === quizDetails.questions.length - 1
                ? 'bg-green-500 hover:bg-green-700'
                : 'bg-blue-500 hover:bg-blue-700'
            } text-white font-bold py-2 px-4 rounded ml-2`}
          >
            {currentQuestion === quizDetails.questions.length - 1
              ? 'Finish'
              : 'Next'}
          </button>
        </div>
      </div>
    );
  };
  const renderQuizCompletion = () => {
    return (
      <div className="quiz-completion-container">
        <h2>Quiz Completed!</h2>
        <div className="log-data">
          {logData.map((log, index) => (
            <div key={index} className="log-item">
              <p><strong>Question:</strong> {log.question}</p>
              {log.student_answer && <p><strong>Your Answer:</strong> {log.student_answer}</p>}
              {log.student_answer_url && (
                <p><strong>Your Answer (URL):</strong> {log.student_answer_url}</p>
              )}
              {log.url && (
                <p><strong>File URL:</strong> {log.url}</p>
              )}
            </div>
          ))}
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
          onClick={() => handleSubmit()}
        >
          Submit
        </button>
      </div>
    );
  };
  
  const renderUserAnswers = () => {
    return (
      <div className="user-answers-container">
        <h2>Your Answers</h2>
        {logData.map((log, index) => (
          <div key={index} className="log-item">
            <p><strong>Question:</strong> {log.question}</p>
            {log.student_answer && <p><strong>Your Answer:</strong> {log.student_answer}</p>}
            {log.student_answer_url && (
              <p><strong>Your Answer (URL):</strong> {log.student_answer_url}</p>
            )}
            {log.url && (
              <p><strong>File URL:</strong> {log.url}</p>
            )}
          </div>
        ))}
        <button
          onClick={() => handleSubmit()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
        >
          Submit
        </button>
      </div>
    );
  };
  
const handleSubmit = async () => {
  try {
    // Format logData according to the required structure
    const formattedLogData = logData.map(log => {
      const currentQuestionData = quizDetails.questions.find(question => question._id === log.id);
      let formattedEntry = {
        id: log.id,
        question: currentQuestionData.question
      };
      
      if (currentQuestionData.type === "MCQ" || currentQuestionData.type === "ANSWER") {
        formattedEntry.model_answer = log.model_answer;
        formattedEntry.student_answer = log.student_answer;
      } else if (currentQuestionData.type === "SOUND") {
        formattedEntry.model_answer = log.model_answer;
        formattedEntry.student_answer_url = log.student_answer;
      } else if (currentQuestionData.type === "FILE") {
        formattedEntry.url = log.url;
      }
      
      return formattedEntry;
    });
    
    const requestBody = {
      data: formattedLogData
    };
    
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const predictionResult = await response.json();
    console.log("Prediction Result:", predictionResult);

    // Log the response from the prediction API
    console.log("Prediction API Response:", predictionResult);

    const totalSimilarity = predictionResult.reduce(
      (total, item) => total + item.similarity_classification,
      0
    );
    console.log("Total Similarity Classification:", totalSimilarity);
    setTotalSimilarity(totalSimilarity);
  } catch (error) {
    console.error("Error predicting:", error);
  }
};


  if (isLoading) {
    return (
      <div className="quiz-loading">
        Loading...
      </div>
    );
  }

  return (
    <div className="quiz-container">
      {!quizStarted && !quizFinished && (
        <div className="quiz-start">
          <h2>Quiz Information</h2>
          <p>Total Questions: {quizDetails.questions.length}</p>
          <p>Time Limit: {quizDetails.timeLimitMinutes} minutes</p>
          <button
            onClick={handleStartQuiz}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Start Quiz
          </button>
        </div>
      )}

      {quizStarted && !quizFinished && (
        <div className="quiz-in-progress">
          <h2>Quiz in Progress</h2>
          <p>Question {currentQuestion + 1} of {quizDetails.questions.length}</p>
          <p>Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}</p>
          {renderQuestion()}
        </div>
      )}

      {quizFinished && !submitClicked && (
        <div className="quiz-completed">
          {renderQuizCompletion()}
        </div>
      )}

      {submitClicked && (
        <div className="user-answers">
          {renderUserAnswers()}
        </div>
      )}

      {submitClicked && totalSimilarity > 0 && (
        <div className="prediction-results">
          <h2>Prediction Results</h2>
          <p>Similarity Classification: {totalSimilarity}</p>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Perform Prediction
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizApp;
