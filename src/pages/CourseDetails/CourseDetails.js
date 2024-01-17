import React from 'react'
import EventImage from '../../Assets/DataBase.jpg'
import '../CourseDetails/CourseDetails.css'
import pdficon from '../../Assets/pdf-download-2617.png'
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';


export default function CourseDetails() {


    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/user/getallCourse/${user._id}`);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const responseData = await response.json();
                setCourses(responseData);
                setLoading(false);
            } catch (error) {
                console.error('Fetch error:', error);
                setLoading(false);
            }
        };

        // Call the fetchCourses function
        fetchCourses();
    }, [user._id]);

    useEffect(() => {
        console.log("fetching");
        console.log(courses);
    }, [courses]);



    return (
        <div>
        <Header/>
            <div className="CourseDetailsImage">
                <img style={{ height: '60vh', width: '100%' }} src={EventImage} alt="CourseDetailsImage" />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }} class="border-b border-gray-200 dark:border-gray-700">
                <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    <li class="mr-2">
                        <Link to={"/"} class="inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group" aria-current="page">
                            <svg class="w-4 h-4 mr-2 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                            </svg>Contanet
                        </Link>
                    </li>
                    {// <li class="mr-2">
                    //     <Link to={"./Instructor"} class="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                    //         <svg class="w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    //             <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    //         </svg>Instructor
                    //     </Link>
                    // </li>
                }
                </ul>
            </div>

            <div className=''>
                <div className="topic rounded-lg shadow  m-3 p-2">
                    <small className='topic-title'>LEC 1</small>
                    <div className="NOTES">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, dolores. Dicta, aperiam recusandae! Fuga vero suscipit, aspernatur vitae corporis libero blanditiis alias deleniti dolore. Deleniti itaque sed atque cum recusandae.</div>
                    <small className='pdfimg'><img src={pdficon} /> lec 1 pdf_1 </small>
                    <small className='pdfimg'><img src={pdficon} /> lec 1 pdf_2 lec 1 pdf_2 </small>
                    <small className='pdfimg'><img src={pdficon} /> lec 1 pdf_3 lec 1 pdf_2 lec 1 pdf_2</small>
                </div>

                <div className="topic rounded-lg shadow  m-3 p-2">
                    <small className='topic-title'>ASSINMENT</small>
                    <div className="NOTES">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, dolores. Dicta, aperiam recusandae! Fuga vero suscipit, aspernatur vitae corporis libero blanditiis alias deleniti dolore. Deleniti itaque sed atque cum recusandae.</div>
                    <small className='pdfimg'><img src={pdficon} />ASSINMINT</small>
                    <div className='quizlink'>
                        <Link className='Link' to={'/quizapp'}>UPload ASSINMINT</Link>
                    </div>
                </div>

                <div className="topic rounded-lg shadow  m-3 p-2">
                    <small className='topic-title'>quiz</small>
                    <h1 className='m-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, dolores. Dicta, aperiam recusandae! Fuga vero suscipit, aspernatur vitae corporis libero blanditiis alias deleniti dolore. Deleniti itaque sed atque cum recusandae.</h1>
                    <div className='quizlink'>
                        <Link className='Link' to={'/quizapp'}>Quiz</Link>
                    </div>
                </div>

            </div>




        </div>
    )
}
