import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditQuiz = () => {
  const { courseId, _id } = useParams();
  const [loading, setLoading] = useState(true);
  const [quizData, setQuizData] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    timeLimitMinutes: 0,
    maxAttempts: 0,
    questions: [],
    deadline: "",
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(
          `https://gproject-63ye.onrender.com/api/quiz/${courseId}/edit_quiz/${_id}`
        );
        const quizData = response.data;
        setQuizData(quizData);
        setFormData({
          title: quizData.title,
          description: quizData.description,
          timeLimitMinutes: quizData.quizDetails.timeLimitMinutes,
          maxAttempts: quizData.quizDetails.maxAttempts,
          questions: quizData.quizDetails.questions,
          deadline: quizData.quizDetails.deadline
            ? new Date(quizData.quizDetails.deadline).toISOString().slice(0, 16)
            : "", // Check if deadline exists
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quiz:", error);
        setError("Error fetching quiz. Please try again later.");
      }
    };

    fetchQuiz();
  }, [courseId, _id]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index][field] = value;
    setFormData({
      ...formData,
      questions: updatedQuestions,
    });
  };

  const handleAddQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        {
          question: "",
          type: "MCQ",
          options: [
            { option: "" },
            { option: "" },
            { option: "" },
            { option: "" },
          ],
          right_answer: "",
        },
      ],
    });
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions.splice(index, 1);
    setFormData({
      ...formData,
      questions: updatedQuestions,
    });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].options[optionIndex].option = value;
    setFormData({
      ...formData,
      questions: updatedQuestions,
    });
  };

  const handleDeleteOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setFormData({
      ...formData,
      questions: updatedQuestions,
    });
  };

  const handleAddOption = (questionIndex) => {
    const updatedQuestions = [...formData.questions];
    if (updatedQuestions[questionIndex].options.length < 4) {
      updatedQuestions[questionIndex].options.push({ option: "" });
      setFormData({
        ...formData,
        questions: updatedQuestions,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `https://gproject-63ye.onrender.com/api/quiz/${courseId}/edit_quiz/${_id}`,
        {
          quizData: {
            title: formData.title,
            description: formData.description,
            quizDetails: {
              timeLimitMinutes: formData.timeLimitMinutes,
              maxAttempts: formData.maxAttempts,
              questions: formData.questions,
              deadline: formData.deadline,
            },
          },
        }
      );

      console.log("Quiz updated successfully");
      navigate(`/CourseDetails/${courseId}`);
    } catch (error) {
      console.error("Error updating quiz:", error);
      setError("Error updating quiz. Please try again later.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">Edit Quiz</h1>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div className="space-y-2">
          <label htmlFor="title" className="block font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2 outline-none"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label htmlFor="description" className="block font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2 outline-none"
            rows="3"
          ></textarea>
        </div>

        {/* Time Limit */}
        <div className="space-y-2">
          <label htmlFor="timeLimitMinutes" className="block font-medium">
            Time Limit (minutes)
          </label>
          <input
            type="number"
            id="timeLimitMinutes"
            name="timeLimitMinutes"
            value={formData.timeLimitMinutes}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2 outline-none"
          />
        </div>

        {/* Max Attempts */}
        <div className="space-y-2">
          <label htmlFor="maxAttempts" className="block font-medium">
            Max Attempts
          </label>
          <input
            type="number"
            id="maxAttempts"
            name="maxAttempts"
            value={formData.maxAttempts}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2 outline-none"
          />
        </div>

        {/* Deadline */}
        <div className="space-y-2">
          <label htmlFor="deadline" className="block font-medium">
            Deadline
          </label>
          <input
            type="datetime-local"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2 outline-none"
          />
        </div>

        {/* Questions */}
        {formData.questions.map((question, index) => (
          <div key={index} className="border p-4 rounded space-y-2">
            <div className="flex justify-between items-center">
              <h2 className="font-medium">Question {index + 1}</h2>
              <button
                type="button"
                className="text-red-600 font-medium"
                onClick={() => handleDeleteQuestion(index)}
              >
                Delete
              </button>
            </div>
            <div className="space-y-2">
              <label
                htmlFor={`question_${index}`}
                className="block font-medium"
              >
                Question
              </label>
              <input
                type="text"
                id={`question_${index}`}
                name={`question_${index}`}
                value={question.question}
                onChange={(e) =>
                  handleQuestionChange(index, "question", e.target.value)
                }
                className="w-full border rounded px-3 py-2 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor={`type_${index}`} className="block font-medium">
                Type
              </label>
              <select
                id={`type_${index}`}
                name={`type_${index}`}
                value={question.type}
                onChange={(e) =>
                  handleQuestionChange(index, "type", e.target.value)
                }
                className="w-full border rounded px-3 py-2 outline-none"
              >
                <option value="MCQ">MCQ</option>
                <option value="ANSWER">Answer</option>
                <option value="SOUND">Sound</option>
                <option value="FILE">File</option>
              </select>
            </div>
            {question.type === "MCQ" && (
              <div className="space-y-2">
                <label
                  htmlFor={`rightAnswer_${index}`}
                  className="block font-medium"
                >
                  Right Answer
                </label>
                <input
                  type="text"
                  id={`rightAnswer_${index}`}
                  name={`rightAnswer_${index}`}
                  value={question.right_answer}
                  onChange={(e) =>
                    handleQuestionChange(index, "right_answer", e.target.value)
                  }
                  className="w-full border rounded px-3 py-2 outline-none"
                />
              </div>
            )}
            {question.type === "MCQ" && (
              <div className="space-y-2">
                <label className="block font-medium">Options</label>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex space-x-2">
                    <input
                      type="text"
                      value={option.option}
                      onChange={(e) =>
                        handleOptionChange(index, optionIndex, e.target.value)
                      }
                      className="w-full border rounded px-3 py-2 outline-none"
                    />
                    {optionIndex >= 4 ? (
                      <button
                        type="button"
                        className="text-red-600 font-medium"
                        onClick={() => handleDeleteOption(index, optionIndex)}
                      >
                        Delete
                      </button>
                    ) : null}
                  </div>
                ))}
                {question.options.length < 4 && (
                  <button
                    type="button"
                    onClick={() => handleAddOption(index)}
                    className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    disabled={question.options.length >= 4}
                  >
                    Add Option
                  </button>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Add Question Button */}
        <button
          type="button"
          onClick={handleAddQuestion}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Add Question
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Update Quiz
        </button>
      </form>
    </div>
  );
};

export default EditQuiz;
// https://firebasestorage.googleapis.com/v0/b/project-name-e7685.appspot.com/o/files%2Fphoto-1454117096348-e4abbeba002c.jpg?alt=media&token=1513e586-5707-4b64-90a9-c7a8be52b042