import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditQuiz = () => {
  const { courseId, _id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editedQuiz, setEditedQuiz] = useState(null);
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newQuestionType, setNewQuestionType] = useState("MCQ"); // Default to MCQ
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [options, setOptions] = useState(["", "", "", ""]); // State to manage MCQ options

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(
          `https://gproject-63ye.onrender.com/api/quiz/${courseId}/edit_quiz/${_id}`
        );
        const quizData = response.data;
        setQuiz(quizData);
        setEditedQuiz({
          ...quizData,
          timeLimitMinutes: quizData.quizDetails.timeLimitMinutes,
          maxAttempts: quizData.quizDetails.maxAttempts,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [courseId, _id]);

  const handleInputChange = (e, questionIndex, optionIndex) => {
    const { name, value } = e.target;
    const updatedQuiz = { ...editedQuiz };

    if (
      questionIndex !== undefined &&
      questionIndex !== null &&
      optionIndex !== undefined &&
      optionIndex !== null
    ) {
      updatedQuiz.quizDetails.questions[questionIndex].options[optionIndex][
        name
      ] = value;
    } else if (questionIndex !== undefined && questionIndex !== null) {
      updatedQuiz.quizDetails.questions[questionIndex][name] = value;
    } else {
      updatedQuiz[name] = value;
    }

    setEditedQuiz(updatedQuiz);
  };

  const handleAddQuestion = async () => {
    try {
      const updatedQuiz = { ...editedQuiz };

      // Prepare the question object based on the type
      let newQuestion = {
        quizId: _id,
        question: newQuestionText,
        type: newQuestionType,
      };

      if (newQuestionType === "MCQ") {
        newQuestion = {
          ...newQuestion,
          options: options.map((option) => ({ option })),
          rightAnswer: options[0] || "", // Assuming the first option is the right answer
        };
      } else if (newQuestionType === "ANSWER") {
        newQuestion = {
          ...newQuestion,
          rightAnswer: options[0] || "", // Assuming the answer for short answer type
        };
      }

      // Send the request to add the question
      const response = await axios.post(
        `https://gproject-63ye.onrender.com/api/quiz/${courseId}/add_question`,
        newQuestion
      );

      // Update the quiz state
      updatedQuiz.quizDetails.questions.push(response.data);
      setEditedQuiz(updatedQuiz);
      setNewQuestionText("");
      setOptions(["", "", "", ""]); // Reset options state
      setNewQuestionType("MCQ"); // Reset question type to MCQ
      setShowModal(false); // Close the modal after adding the question
      alert("Question added successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddOption = () => {
    if (options.length < 6) {
      setOptions([...options, ""]);
    }
  };

  const handleRemoveQuestion = (questionIndex) => {
    const updatedQuiz = { ...editedQuiz };
    updatedQuiz.quizDetails.questions.splice(questionIndex, 1);
    setEditedQuiz(updatedQuiz);
  };

  const handleSaveQuiz = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `https://gproject-63ye.onrender.com/api/quiz/${courseId}/edit_quiz/${_id}`,
        {
          quizData: editedQuiz,
        }
      );
      setQuiz(response.data);
      setLoading(false);
      alert("Quiz updated successfully!");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setNewQuestionText("");
    setOptions(["", "", "", ""]);
    setNewQuestionType("MCQ");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">Error: {error}</div>;
  }

  if (!quiz) {
    return <div className="text-center mt-4">Quiz not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        <input
          type="text"
          className="border border-gray-300 rounded-md p-2 w-full"
          name="title"
          value={editedQuiz.title}
          onChange={(e) => handleInputChange(e)}
        />
      </h2>
      <p className="mb-6">
        <textarea
          className="border border-gray-300 rounded-md p-2 w-full"
          name="description"
          value={editedQuiz.description}
          onChange={(e) => handleInputChange(e)}
        />
      </p>
      <div>
        <h3 className="text-xl font-semibold mb-4">Quiz Details</h3>
        <p className="mb-2">
          <strong>Time Limit:</strong>{" "}
          <input
            type="number"
            className="border border-gray-300 rounded-md p-2"
            name="timeLimitMinutes"
            value={editedQuiz.timeLimitMinutes}
            onChange={(e) => handleInputChange(e)}
          />{" "}
          minutes
        </p>
        <p className="mb-4">
          <strong>Max Attempts:</strong>{" "}
          <input
            type="number"
            className="border border-gray-300 rounded-md p-2"
            name="maxAttempts"
            value={editedQuiz.maxAttempts}
            onChange={(e) => handleInputChange(e)}
          />
        </p>
        <div>
          {editedQuiz.quizDetails.questions.map((question, questionIndex) => (
            <div key={questionIndex} className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-semibold mb-2">
                  Question {questionIndex + 1}:{" "}
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2"
                    name={`quizDetails.questions[${questionIndex}].question`}
                    value={question.question}
                    onChange={(e) => handleInputChange(e, questionIndex)}
                  />
                </h4>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleRemoveQuestion(questionIndex)}
                >
                  Remove
                </button>
              </div>
              <p className="mb-2">
                <strong>Type:</strong>{" "}
                <select
                  className="border border-gray-300 rounded-md p-2"
                  name={`quizDetails.questions[${questionIndex}].type`}
                  value={question.type}
                  onChange={(e) => handleInputChange(e, questionIndex)}
                >
                  <option value="MCQ">MCQ</option>
                  <option value="ANSWER">ANSWER</option>
                </select>
              </p>
              {question.type === "MCQ" && (
                <ul className="list-disc list-inside mb-2">
                  {question.options.map((option, optionIndex) => (
                    <li key={optionIndex}>
                      <input
                        type="text"
                        className="border border-gray-300 rounded-md p-2"
                        name={`quizDetails.questions[${questionIndex}].options[${optionIndex}].option`}
                        value={option.option}
                        onChange={(e) =>
                          handleInputChange(e, questionIndex, optionIndex)
                        }
                      />
                    </li>
                  ))}
                  {options
                    .slice(question.options.length, 4)
                    .map((option, index) => (
                      <li key={index}>
                        <input
                          type="text"
                          className="border border-gray-300 rounded-md p-2"
                          placeholder={`Option ${
                            question.options.length + index + 1
                          }`}
                          value={option}
                          onChange={(e) => {
                            const updatedOptions = [...options];
                            updatedOptions[question.options.length + index] =
                              e.target.value;
                            setOptions(updatedOptions);
                          }}
                        />
                      </li>
                    ))}
                  <p className="mt-2">
                    <strong>Right Answer:</strong>{" "}
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2"
                      name={`quizDetails.questions[${questionIndex}].rightAnswer`}
                      value={question.rightanswer}
                      onChange={(e) => handleInputChange(e, questionIndex)}
                      />
                      </p>
                      </ul>
                      )}
                      {question.type === "ANSWER" && (
                      <p>
                      <strong>Answer:</strong>{" "}
                      <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2"
                      name={`quizDetails.questions[${questionIndex}].rightAnswer`}
                      value={question.rightAnswer}
                      onChange={(e) => handleInputChange(e, questionIndex)}
                      />
                      </p>
                      )}
                      </div>
                      ))}
                      </div>
                      </div>  {/* Modal for adding a new question */}
  {showModal && (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div
            className="absolute inset-0 bg-gray-500 opacity-75"
            onClick={handleModalClose}
          ></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Add New Question
                </h3>

                {/* Question Text */}
                <div className="mb-4">
                  <label
                    htmlFor="question-text"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Question Text
                  </label>
                  <input
                    type="text"
                    id="question-text"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                  />
                </div>

                {/* Question Type */}
                <div className="mb-4">
                  <label
                    htmlFor="question-type"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Question Type
                  </label>
                  <select
                    id="question-type"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    value={newQuestionType}
                    onChange={(e) => setNewQuestionType(e.target.value)}
                  >
                    <option value="MCQ">MCQ (Multiple Choice)</option>
                    <option value="ANSWER">ANSWER (Short Answer)</option>
                  </select>
                </div>

                {/* Options for MCQ */}
                {newQuestionType === "MCQ" && (
                  <div className="mb-4">
                    <label
                      htmlFor="options"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Options
                    </label>
                    {options.map((option, index) => (
                      <input
                        key={index}
                        type="text"
                        className="border border-gray-300 rounded-md p-2 w-full mt-2"
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => {
                          const updatedOptions = [...options];
                          updatedOptions[index] = e.target.value;
                          setOptions(updatedOptions);
                        }}
                      />
                    ))}
                    {options.length < 6 && (
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                        onClick={handleAddOption}
                      >
                        Add Option
                      </button>
                    )}
                  </div>
                )}

                {/* Right Answer */}
                <div className="mb-4">
                  <label
                    htmlFor="right-answer"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Right Answer
                  </label>
                  <input
                    type="text"
                    id="right-answer"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    value={options[0]}
                    onChange={(e) => {
                      const updatedOptions = [...options];
                      updatedOptions[0] = e.target.value;
                      setOptions(updatedOptions);
                    }}
                  />
                </div>

                {/* Modal Footer */}
                <div className="mt-5 sm:mt-6">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={handleAddQuestion}
                  >
                    Add Question
                  </button>
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                    onClick={handleModalClose}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}

  {/* Add Question Button */}
  <div className="mt-6">
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => setShowModal(true)}
    >
      Add Question
    </button>
  </div>

  {/* Save Button */}
  <div className="mt-6">
    <button
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleSaveQuiz}
    >
      Save Quiz
    </button>
  </div>
</div>
);
};

export default EditQuiz;
