import React, { useEffect, useState } from "react";
import EventImage from "../../Assets/DataBase.jpg";
import "../CourseDetails/CourseDetails.css";
import pdficon from "../../Assets/pdf-download-2617.png";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useAuthContext } from "../Login/hooks/useAuthContext";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { DeleteMaterialbtn } from "../../components/loading/loading";
import axios from "axios";

export default function CourseDetails() {
  const { user } = useAuthContext();
  const Userpermission = user?.permission;
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [file, setFile] = useState(null);
  const [downloadURL, setDownloadURL] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (file == null) return;
    const imageRef = ref(storage, `files/students/${file.name}`);
    uploadBytes(imageRef, file)
      .then(() => getDownloadURL(imageRef))
      .then((url) => {
        setDownloadURL(url);
        alert("Uploaded successfully");
      })
      .catch((error) => console.error("Error uploading file:", error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !selectedType) {
      alert("Please fill in all fields");
      return;
    }
    setUploading(true);
    // fetch('https://gproject-63ye.onrender.com/api/course/addLectureToCourse', {
    fetch("http://localhost:5000/api/course/addLectureToCourse", {
      method: "POST",
      body: JSON.stringify({
        course_id: id,
        lectureDetails: {
          title: title,
          description: description,
          type: selectedType,
          fileLink: downloadURL,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        alert("Lecture added successfully");
        setIsModalOpen(false); // Close modal
        setTitle(""); // Clear input fields
        setDescription("");
        setSelectedType("");
        setDownloadURL("");
        // Reload the page to fetch updated data
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error sending data:", error);
        alert("Error adding lecture");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (courseId, materialId) => {
    try {
      await axios.delete(
        `https://gproject-63ye.onrender.com/api/user/deleteMaterial/${courseId}/${materialId}`
      );
      // Update the state to reflect the deletion
      setCourses((prevCourses) => {
        const updatedCourses = prevCourses.map((course) => {
          return {
            ...course,
            materials: course.materials.filter(
              (material) => material._id !== materialId
            ),
          };
        });
        return updatedCourses;
      });
      // Show success message or handle as needed
      alert("Material deleted successfully");
    } catch (err) {
      // Handle error, maybe show an error message
      console.error("Error deleting material:", err);
      alert("Error deleting material");
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `https://gproject-63ye.onrender.com/api/user/getcoursedetils/${id}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        setCourses(responseData);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchCourses();
  }, [id]);

  return (
    <div>
      <Header />
      <div
        style={{ display: "flex", justifyContent: "center" }}
        className="border-b border-gray-200 dark:border-gray-700"
      >
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <li className="mr-2 flex">
            {(Userpermission === "admin" ||
              Userpermission === "instructor") && (
              <div>
                <button
                  className="m-5 block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                  onClick={handleModalOpen}
                >
                  Add Material
                </button>
                {isModalOpen && (
                  <div
                    id="crud-modal"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-gray-500 bg-opacity-75"
                  >
                    <div className="relative bg-white rounded-lg shadow-lg max-w-md">
                      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Create New Item
                        </h3>
                        <button
                          type="button"
                          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                          onClick={handleModalClose}
                        >
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            viewBox="0 0 14 14"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                          </svg>
                          <span className="sr-only">Close modal</span>
                        </button>
                      </div>
                      <form
                        onSubmit={handleSubmit}
                        style={{
                          border: "1px solid",
                          borderRadius: "15px",
                          padding: "20px",
                          margin: "20px",
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(1fr, minmax(500px, 1fr))",
                          gridGap: "30px",
                        }}
                      >
                        <TextField
                          value={title}
                          label="Lecture Title"
                          name="Lecture Title"
                          onChange={(e) => setTitle(e.target.value)}
                          required
                        />
                        <TextField
                          value={description}
                          className="m-3"
                          label="Lecture Description"
                          name="Lecture Description"
                          onChange={(e) => setDescription(e.target.value)}
                          required
                        />
                        <select
                          id="lecture-type"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={(e) => setSelectedType(e.target.value)}
                          value={selectedType}
                        >
                          <option value="" disabled>
                            Choose a Type
                          </option>
                          <option value="lecture">Lecture</option>
                          <option value="assignment">Assignment</option>
                          <option value="quiz">Quiz</option>
                        </select>
                        <div className="file">
                          <input type="file" onChange={handleFileChange} />
                          <Button
                            style={{ border: "1px solid blue" }}
                            onClick={handleUpload}
                          >
                            Upload
                          </Button>
                        </div>
                        <Button
                          type="submit"
                          style={{ border: "1px solid blue" }}
                          disabled={uploading}
                        >
                          {uploading ? "Uploading..." : "Submit"}
                        </Button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}
          </li>
        </ul>
      </div>

      <div className="">
        {courses[0]?.materials.map((course) => {
          switch (course?.type) {
            case "lecture":
              return (
                <div
                  className="border topic rounded-lg shadow m-3 p-2"
                  key={course.title}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "15px",
                    }}
                  >
                    <small className="topic-title">{course.title}</small>
                    {(Userpermission === "admin" ||
                      Userpermission === "instructor") && (
                      <button onClick={() => handleDelete(id, course._id)}>
                        <DeleteMaterialbtn />
                      </button>
                    )}
                  </div>
                  <div className="NOTES">{course.description}</div>
                  <a
                    className="pdfimg flex bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-6 m-2 border border-blue-500 hover:border-transparent rounded"
                    href={course.fileLink}
                  >
                    <img src={pdficon} alt="PDF icon" />
                    Download Lecture
                  </a>
                </div>
              );
            case "quiz":
              return (
                <div
                  className="border topic rounded-lg shadow m-3 p-2"
                  key={course.title}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "15px",
                    }}
                  >
                    <small className="topic-title">{course.title}</small>
                    {(Userpermission === "admin" ||
                      Userpermission === "instructor") && (
                      <button onClick={() => handleDelete(id, course._id)}>
                        <DeleteMaterialbtn />
                      </button>
                    )}
                  </div>
                  <h1 className="m-6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consequatur, dolores. Dicta, aperiam recusandae! Fuga vero
                    suscipit, aspernatur vitae corporis libero blanditiis alias
                    deleniti dolore. Deleniti itaque sed atque cum recusandae.
                  </h1>
                  <div className="quizlink">
                    <Link
                      to={`${course?._id}`}
                      className="Link flex bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-6 m-2 border border-blue-500 hover:border-transparent rounded"
                    >
                      Quiz
                    </Link>
                  </div>
                </div>
              );
            case "assignment":
              return (
                <div
                  className="border topic rounded-lg shadow m-3 p-2"
                  key={course.title}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "15px",
                    }}
                  >
                    <small className="topic-title">{course.title}</small>
                    {(Userpermission === "admin" ||
                      Userpermission === "instructor") && (
                      <button onClick={() => handleDelete(id, course._id)}>
                        <DeleteMaterialbtn />
                      </button>
                    )}
                  </div>
                  <div className="NOTES">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consequatur, dolores. Dicta, aperiam recusandae! Fuga vero
                    suscipit, aspernatur vitae corporis libero blanditiis alias
                    deleniti dolore. Deleniti itaque sed atque cum recusandae.
                  </div>
                  <a
                    className="pdfimg flex bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-6 m-2 border border-blue-500 hover:border-transparent rounded"
                    href={course.fileLink}
                  >
                    <img src={pdficon} alt="PDF icon" />
                    Download Assignment
                  </a>
                  <div className="quizlink">
                    <Link className="Link" to={"/"}>
                      Upload Assignment
                    </Link>
                  </div>
                </div>
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}
