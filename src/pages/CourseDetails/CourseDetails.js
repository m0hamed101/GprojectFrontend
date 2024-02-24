// import React, { useEffect, useState } from 'react'
// import EventImage from '../../Assets/DataBase.jpg'
// import '../CourseDetails/CourseDetails.css'
// import pdficon from '../../Assets/pdf-download-2617.png'
// import { Link } from 'react-router-dom';
// import Header from '../../components/Header/Header';
// import { useAuthContext } from '../Login/hooks/useAuthContext';
// import { useParams } from 'react-router-dom';
// import Button from '@mui/material/Button';




// import TextField from '@mui/material/TextField';
// import { storage } from '../../firebase'; // Import the firebase storage instance
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';


// // import AddBoxIcon from '@mui/icons-material/AddBox';
// // import QuizIcon from '@mui/icons-material/Quiz';
// // import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
// // import Box from '@mui/material/Box';
// // import Typography from '@mui/material/Typography';
// // import Modal from '@mui/material/Modal';
// // const style = {
// //     position: 'absolute',
// //     top: '50%',
// //     left: '50%',
// //     transform: 'translate(-50%, -50%)',
// //     width: 400,
// //     bgcolor: 'background.paper',
// //     border: '2px solid #000',
// //     boxShadow: 24,
// //     p: 4,
// // };


// export default function CourseDetails() {


//     const handleChangeselection = (e) => {
//         const selectedValue = e.target.value;
//         setSelectedType(selectedValue);
//     };

//     const [title, settitle] = useState(''); // State for description
//     const [file, setFile] = useState(null);
//     const [selectedType, setSelectedType] = useState('');
//     const [downloadURL, setDownloadURL] = useState('');
//     const [description, setdescription] = useState(''); // State for DOCName

//     const handleFileChange = (e) => {
//         const selectedFile = e.target.files[0];
//         setFile(selectedFile);
//     };

//     const handleUpload = () => {
//         if (file == null) return;
//         const imageRef = ref(storage, `files/students/${file.name}`);

//         // Upload the file
//         uploadBytes(imageRef, file)
//             .then(() => {
//                 // Once the upload is complete, get the download URL
//                 return getDownloadURL(imageRef);
//             })
//             .then((url) => {
//                 // Now you have the download URL, you can use it as needed
//                 setDownloadURL(url);
//                 // console.log('File download URL:', url);
//             })
//             .catch((error) => {
//                 // Handle any errors that occurred during the upload
//                 console.error('Error uploading file:', error);
//             });
//     };

//     const sendFormData = () => {
//         // Create a FormData object to send as the request body
//         const formData = new FormData();
//         formData.append('title', title);
//         formData.append('description', description);
//         formData.append('ImageURL', downloadURL); // Use downloadURL from state

//         // Send a POST request to your server or API
//         fetch('http://localhost:5000/api/course/addLectureToCourse', {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 title: title,
//                 description: description,
//                 ImageURL: downloadURL,
//             })
//         })
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json(); // You can handle the response here
//             })
//             .then((data) => {
//                 console.log('Response data:', data);
//             })
//             .catch((error) => {
//                 console.error('Error sending data:', error);
//             });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault(); // Prevent the form from submitting normally
//         // Call handleUpload to upload the file and get the download URL
//         handleUpload();
//         // Call sendFormData to send the form data
//         sendFormData();
//     };










//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const handleModalOpen = () => {
//         setIsModalOpen(true);
//     };

//     const handleModalClose = () => {
//         setIsModalOpen(false);
//     };
//     // const [open, setOpen] = React.useState(false);
//     // const handleOpen = () => setOpen(true);
//     // const handleClose = () => setOpen(false);
//     const { user } = useAuthContext()
//     const User = user?.permission
//     const { id } = useParams();
//     const [courses, setCourses] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchCourses = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5000/api/user/getcoursedetils/${id}`);

//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }

//                 const responseData = await response.json();
//                 setCourses(responseData);
//                 setLoading(false);
//                 // console.log('====================================');
//                 // console.log(courses[0]?.materials);
//                 // console.log('====================================');
//             } catch (error) {
//                 console.error('Fetch error:', error);
//                 setLoading(false);
//             }
//         }
//         fetchCourses();
//     }, [user._id])

//     return (
//         <div>
//             <Header />
//             <div className="CourseDetailsImage">
//                 <img
//                     style={{ height: '350px', width: '100%' }}
//                     src={Array.isArray(courses) && courses.length > 0 ? courses[0].ImageURL : EventImage}
//                     alt="CourseDetailsImage" />
//             </div>

//             <div style={{ display: 'flex', justifyContent: 'center' }} className="border-b border-gray-200 dark:border-gray-700">
//                 <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
//                     <li className="mr-2 flex">
//                         {/*<Link to={"/"} className="inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group" aria-current="page">
//                             <svg className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
//                                 <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
//                             </svg>Contanet
//                         </Link>*/
//                         }
//                         {
//                             User === "admin" &&
//                             <div>

//                                 <div>
//                                     <button
//                                         className=" m-5 block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                                         type="button" onClick={handleModalOpen}>Add Material</button>

//                                     {isModalOpen && (
//                                         <div
//                                             id="crud-modal"
//                                             tabIndex="-1"
//                                             aria-hidden="true"
//                                             className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-gray-500 bg-opacity-75"
//                                         >
//                                             <div className="relative bg-white rounded-lg shadow-lg max-w-md">
//                                                 <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
//                                                     <h9 className="text-lg font-semibold text-gray-900">Create New Item</h9>
//                                                     <button
//                                                         type="button"
//                                                         className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
//                                                         onClick={handleModalClose}
//                                                     >
//                                                         <svg
//                                                             className="w-3 h-3"
//                                                             fill="none"
//                                                             viewBox="0 0 14 14"
//                                                             xmlns="http://www.w3.org/2000/svg"
//                                                         >
//                                                             <path
//                                                                 stroke="currentColor"
//                                                                 strokeLinecap="round"
//                                                                 strokeLinejoin="round"
//                                                                 strokeWidth="2"
//                                                                 d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
//                                                             />
//                                                         </svg>
//                                                         <span className="sr-only">Close modal</span>
//                                                     </button>
//                                                 </div>
//                                                 {/* Modal body */}
//                                                 <form
//                                                     onSubmit={handleSubmit} // Handle form submission
//                                                     style={{
//                                                         border: '1px solid',
//                                                         borderRadius: '15px',
//                                                         padding: '20px',
//                                                         margin: "20px",
//                                                         display: 'grid',
//                                                         gridTemplateColumns: 'repeat(1fr, minmax(500px, 1fr))',
//                                                         gridGap: "30px"
//                                                     }}
//                                                 >

//                                                     <TextField
//                                                         value={title}

//                                                         label="lec title"
//                                                         name="lec title"
//                                                         onChange={(e) => settitle(e.target.value)} // Update description state
//                                                         required
//                                                     />


//                                                     <TextField
//                                                         value={description}
//                                                         className="m-3"
//                                                         label="lec description"
//                                                         name="lec description"
//                                                         onChange={(e) => setdescription(e.target.value)} // Update DOCName state
//                                                         required
//                                                     />

//                                                     <select
//                                                         id="countries"
//                                                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                                                         onChange={handleChangeselection}
//                                                         value={selectedType}
//                                                     >
//                                                         <option value="" disabled>Choose a type</option>
//                                                         <option value="lecture">lecture</option>
//                                                         <option value="assignment">assignment</option>
//                                                         <option value="quiz">quiz</option>
//                                                     </select>

//                                                     <div className="file">
//                                                         <input type="file" onChange={handleFileChange} />
//                                                         <Button
//                                                             style={{ border: '1px solid blue' }}
//                                                             onClick={handleUpload}
//                                                         >
//                                                             Upload
//                                                         </Button>
//                                                     </div>

//                                                     <Button type="submit" style={{ border: '1px solid blue' }}>
//                                                         Submit
//                                                     </Button>
//                                                 </form>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>



//                                 {/*
//                                 <div className="inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group">
//                                     <Button onClick={handleOpen}><AddBoxIcon className='m-1' />Add Lec</Button>
//                                     <Modal
//                                         open={open}
//                                         onClose={handleClose}
//                                         aria-labelledby="modal-modal-title"
//                                         aria-describedby="modal-modal-description"
//                                     >
//                                         <Box sx={style}>
//                                             <Typography id="modal-modal-title" variant="h6" component="h2">
//                                                 Text in a modal
//                                             </Typography>

//                                             <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//                                                 Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//                                             </Typography>
//                                         </Box>
//                                     </Modal>
//                                 </div>
//                                 <div className="inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group">
//                                     <Button onClick={handleOpen}><AssignmentTurnedInIcon className='m-1' />Add Assignment</Button>
//                                     <Modal
//                                         open={open}
//                                         onClose={handleClose}
//                                         aria-labelledby="modal-modal-title"
//                                         aria-describedby="modal-modal-description"
//                                     >
//                                         <Box sx={style}>
//                                             <Typography id="modal-modal-title" variant="h6" component="h2">
//                                                 Text in a modal
//                                             </Typography>
//                                             <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//                                                 Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//                                             </Typography>
//                                         </Box>
//                                     </Modal>
//                                 </div>
//                                 <div className="inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group">
//                                     <Button onClick={handleOpen}><QuizIcon className='m-1' />Add Quiz</Button>
//                                     <Modal
//                                         open={open}
//                                         onClose={handleClose}
//                                         aria-labelledby="modal-modal-title"
//                                         aria-describedby="modal-modal-description"
//                                     >
//                                         <Box sx={style}>
//                                             <Typography id="modal-modal-title" variant="h6" component="h2">
//                                                 Text in a modal
//                                             </Typography>
//                                             <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//                                                 Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//                                             </Typography>
//                                         </Box>
//                                     </Modal>
//                                 </div>
//                         */}
//                             </div>
//                         }
//                         {/*
//                             User === "Instructor" &&
//                             <div>
//                                 <div className="inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group">
//                                     <Button onClick={handleOpen}><AddBoxIcon className='m-1' />Add Lec</Button>
//                                     <Modal
//                                         open={open}
//                                         onClose={handleClose}
//                                         aria-labelledby="modal-modal-title"
//                                         aria-describedby="modal-modal-description"
//                                     >
//                                         <Box sx={style}>
//                                             <Typography id="modal-modal-title" variant="h6" component="h2">
//                                                 Text in a modal
//                                             </Typography>
//                                             <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//                                                 Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//                                             </Typography>
//                                         </Box>
//                                     </Modal>
//                                 </div>
//                                 <div className="inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group">
//                                     <Button onClick={handleOpen}><AssignmentTurnedInIcon className='m-1' />Add Assignment</Button>
//                                     <Modal
//                                         open={open}
//                                         onClose={handleClose}
//                                         aria-labelledby="modal-modal-title"
//                                         aria-describedby="modal-modal-description"
//                                     >
//                                         <Box sx={style}>
//                                             <Typography id="modal-modal-title" variant="h6" component="h2">
//                                                 Text in a modal
//                                             </Typography>
//                                             <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//                                                 Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//                                             </Typography>
//                                         </Box>
//                                     </Modal>
//                                 </div>
//                                 <div className="inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group">
//                                     <Button onClick={handleOpen}><QuizIcon className='m-1' />Add Quiz</Button>
//                                     <Modal
//                                         open={open}
//                                         onClose={handleClose}
//                                         aria-labelledby="modal-modal-title"
//                                         aria-describedby="modal-modal-description"
//                                     >
//                                         <Box sx={style}>
//                                             <Typography id="modal-modal-title" variant="h6" component="h2">
//                                                 Text in a modal
//                                             </Typography>
//                                             <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//                                                 Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//                                             </Typography>
//                                         </Box>
//                                     </Modal>
//                                 </div>
//                             </div>
//                     */}
//                     </li>
//                     {// <li class="mr-2">
//                         //     <Link to={"./Instructor"} class="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
//                         //         <svg class="w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
//                         //             <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
//                         //         </svg>Instructor
//                         //     </Link>
//                         // </li>
//                     }
//                 </ul>
//             </div>

//             <div className=''>
//                 {courses[0]?.materials.map(course => {
//                     switch (course?.type) {
//                         case 'lecture':
//                             return <div className="topic rounded-lg shadow  m-3 p-2">
//                                 <small className='topic-title'>{course.title}</small>
//                                 <div className="NOTES">{course.description}</div>

//                                 <a className='pdfimg flex bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-6 m-2 border border-blue-500 hover:border-transparent rounded' href={course.fileLink}>
//                                     <img src={pdficon} alt="PDF icon" />dawnload lecture</a>

//                                 {
//                                     // <a className='pdfimg'><img src={pdficon} />{course.fileLink}/>
//                                     //<small className='pdfimg'><img src={pdficon} /> lec 1 pdf_2 lec 1 pdf_2 </small>
//                                     // <small className='pdfimg'><img src={pdficon} /> lec 1 pdf_3 lec 1 pdf_2 lec 1 pdf_2</small>
//                                 }
//                             </div>;
//                         case 'quiz':
//                             return <div className="topic rounded-lg shadow  m-3 p-2">
//                                 <small className='topic-title'>quiz</small>
//                                 <h1 className='m-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, dolores. Dicta, aperiam recusandae! Fuga vero suscipit, aspernatur vitae corporis libero blanditiis alias deleniti dolore. Deleniti itaque sed atque cum recusandae.</h1>
//                                 <div className='quizlink'>
//                                     <Link className='Link flex bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-6 m-2 border border-blue-500 hover:border-transparent rounded' to={'/quizapp'}>Quiz</Link>
//                                 </div>
//                             </div>;
//                         case 'assignment':
//                             return <div className="topic rounded-lg shadow  m-3 p-2">
//                                 <small className='topic-title'>ASSINMENT</small>
//                                 <div className="NOTES">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, dolores. Dicta, aperiam recusandae! Fuga vero suscipit, aspernatur vitae corporis libero blanditiis alias deleniti dolore. Deleniti itaque sed atque cum recusandae.</div>
//                                 <small className='pdfimg'><img src={pdficon} />ASSINMINT</small>
//                                 <div className='quizlink'>
//                                     <Link className='Link' to={'/quizapp'}>UPload ASSINMINT</Link>
//                                 </div>
//                             </div>;
//                         default:
//                             return null;
//                     }
//                 })}






//             </div>
//         </div>
//     )
// }



// const sendFormData = () => {
//     const formData = new FormData();
//     formData.append('course_id', id);
//     formData.append('lectureDetails', JSON.stringify({
//         title: title,
//         description: description,
//         type: selectedType,
//         fileLink: downloadURL,
//         // lectureDetails: {
//         //     duration: ''
//         // }
//     }));



import React, { useEffect, useState } from 'react';
import EventImage from '../../Assets/DataBase.jpg';
import '../CourseDetails/CourseDetails.css';
import pdficon from '../../Assets/pdf-download-2617.png';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { useAuthContext } from '../Login/hooks/useAuthContext';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function CourseDetails() {
    const { user } = useAuthContext();
    const Userpermission = user?.permission;
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [file, setFile] = useState(null);
    const [downloadURL, setDownloadURL] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [courses, setCourses] = useState([]);

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
            .catch((error) => console.error('Error uploading file:', error));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !description || !selectedType || !downloadURL) {
            alert("Please fill in all fields");
            return;
        }
        fetch('https://gproject-63ye.onrender.com/api/course/addLectureToCourse', {
            method: 'POST',
            body: JSON.stringify({
                course_id: id,
                lectureDetails: {
                    title: title,
                    description: description,
                    type: selectedType,
                    fileLink: downloadURL
                }
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                alert("Lecture added successfully");
            })
            .catch((error) => {
                console.error('Error sending data:', error);
                alert("Error adding lecture");
            });
    };

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(`https://gproject-63ye.onrender.com/api/user/getcoursedetils/${id}`);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const responseData = await response.json();
                setCourses(responseData);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        fetchCourses();
    }, [id]);

    return (
        <div>
            <Header />
            <div className="CourseDetailsImage">
                <img
                    style={{ height: '350px', width: '100%' }}
                    src={Array.isArray(courses) && courses.length > 0 ? courses[0].ImageURL : EventImage}
                    alt="CourseDetailsImage"
                />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }} className="border-b border-gray-200 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    <li className="mr-2 flex">
                        {Userpermission === "admin" && (
                            <div>
                                <button
                                    className="m-5 block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    type="button" onClick={handleModalOpen}>Add Material</button>

                                {isModalOpen && (
                                    <div
                                        id="crud-modal"
                                        tabIndex="-1"
                                        aria-hidden="true"
                                        className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-gray-500 bg-opacity-75"
                                    >
                                        <div className="relative bg-white rounded-lg shadow-lg max-w-md">
                                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                                <h3 className="text-lg font-semibold text-gray-900">Create New Item</h3>
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
                                                    border: '1px solid',
                                                    borderRadius: '15px',
                                                    padding: '20px',
                                                    margin: "20px",
                                                    display: 'grid',
                                                    gridTemplateColumns: 'repeat(1fr, minmax(500px, 1fr))',
                                                    gridGap: "30px"
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
                                                    <option value="" disabled>Choose a Type</option>
                                                    <option value="lecture">Lecture</option>
                                                    <option value="assignment">Assignment</option>
                                                    <option value="quiz">Quiz</option>
                                                </select>

                                                <div className="file">
                                                    <input type="file" onChange={handleFileChange} />
                                                    <Button
                                                        style={{ border: '1px solid blue' }}
                                                        onClick={handleUpload}
                                                    >
                                                        Upload
                                                    </Button>
                                                </div>

                                                <Button type="submit" style={{ border: '1px solid blue' }}>
                                                    Submit
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

            <div className=''>
                {courses[0]?.materials.map(course => {
                    switch (course?.type) {
                        case 'lecture':
                            return (
                                <div className="topic rounded-lg shadow m-3 p-2" key={course.title}>
                                    <small className='topic-title'>{course.title}</small>
                                    <div className="NOTES">{course.description}</div>
                                    <a className='pdfimg flex bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-6 m-2 border border-blue-500 hover:border-transparent rounded' href={course.fileLink}>
                                        <img src={pdficon} alt="PDF icon" />Download Lecture
                                    </a>
                                </div>
                            );
                        case 'quiz':
                            return (
                                <div className="topic rounded-lg shadow m-3 p-2" key={course.title}>
                                    <small className='topic-title'>Quiz</small>
                                    <h1 className='m-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, dolores. Dicta, aperiam recusandae! Fuga vero suscipit, aspernatur vitae corporis libero blanditiis alias deleniti dolore. Deleniti itaque sed atque cum recusandae.</h1>
                                    <div className='quizlink'>
                                        <Link className='Link flex bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-6 m-2 border border-blue-500 hover:border-transparent rounded' to={'/quizapp'}>Quiz</Link>
                                    </div>
                                </div>
                            );
                        case 'assignment':
                            return (
                                <div className="topic rounded-lg shadow m-3 p-2" key={course.title}>
                                    <small className='topic-title'>Assignment</small>
                                    <div className="NOTES">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, dolores. Dicta, aperiam recusandae! Fuga vero suscipit, aspernatur vitae corporis libero blanditiis alias deleniti dolore. Deleniti itaque sed atque cum recusandae.</div>
                                    <a className='pdfimg flex bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-6 m-2 border border-blue-500 hover:border-transparent rounded' href={course.fileLink}>
                                        <img src={pdficon} alt="PDF icon" />Download Assignment
                                    </a>
                                    <div className='quizlink'>
                                        <Link className='Link' to={'/quizapp'}>Upload Assignment</Link>
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
