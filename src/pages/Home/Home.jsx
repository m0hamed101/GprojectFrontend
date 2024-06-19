import React, { useEffect, useState } from "react";
import { Courses } from "../../components/CoursesContaner/Courses";
import Event from "../../components/Event/Event";
import { useAuthContext } from "../../pages/Login/hooks/useAuthContext";
import Loader from "../../components/loading/loading";

export default function Home() {
  const { user } = useAuthContext();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
//   console.log(user._id);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        if (!user || !user._id) {
          throw new Error("User ID is not available");
        }

        const response = await fetch(
          `https://gproject-63ye.onrender.com/api/user/getallCourse/${user._id}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        setCourses(responseData);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App">
      <div className="Appcontaner m-1">
        <Courses courses={courses} />
        <Event courses={courses} />
      </div>
    </div>
  );
}
