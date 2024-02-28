// import React, { useEffect, useState } from 'react';
// import TextField from '@mui/material/TextField';
// import { Button } from '@mui/material';
// import Header from '../../../Header/Header';
// import { useParams } from 'react-router-dom';


// const UpdateUser = () => {
//     let userID = useParams();
//     const [data, setData] = useState([]);

//     // console.log(userID.id);

//     useEffect(() => {
//         // Define the URL you want to fetch data from
//         // const apiUrl = 'https://api.example.com/data';
//         const apiUrl = `http://localhost:5000/api/user/getuser/${userID.id}`;

//         // Use the fetch function to make a GET request
//         fetch(apiUrl)
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json(); // Parse the response body as JSON
//             })
//             .then((responseData) => {
//                 // Update the state with the fetched data
//                 setData(responseData);
//             })
//             .catch((error) => {
//                 console.error('Fetch error:', error);
//             });
//     }, []); // Empty dependency array means this effect runs once after the initial render

// console.log(data[0]);
//     const initialFormData = {
//         userName:data[0]?.name,
//         userID: '1',
//         userYear: '',
//         userEmail: '',
//         userPassword: '',
//         userPermission: '',
//     };
//     const [formData, setFormData] = useState(initialFormData);


//     const [isFormValid, setIsFormValid] = useState(false);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//         validateForm()
//     };
//     // console.log(formData);
//     const validateForm = () => {
//         // Check if all required fields are filled
//         const isValid = Object.values(formData).every((value) => value.trim() !== '');
//         if (isValid) {
//             setIsFormValid(true);
//         } else {
//             setIsFormValid(false);
//         }
//     };

//     const handleSubmit = () => {
//         // Validate the form before submitting



//         // Form is valid, proceed with submitting data
//         const dataToSend = {
//             name: formData.userName,
//             id: formData.userID,
//             year: formData.userYear,
//             email: formData.userEmail,
//             password: formData.userPassword,
//             permission: formData.userPermission,
//         };

//         // Send the data using the Fetch API
//         fetch('http://localhost:5000/api/user/createUser', {
//             method: 'POST',
//             mode: "cors",
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(dataToSend),
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 // Handle the response data as needed
//                 console.log(data);
//             })
//             .catch((error) => {
//                 console.error('Error:', error);
//             });

//     };

//     return (
//         <div>
//             <Header />
//             <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                 <form
//                     style={{
//                         width: "80%",
//                         height: '80%',
//                         border: '1px solid',
//                         borderRadius: '15px',
//                         padding: '15px',
//                         display: 'grid',
//                         gridTemplateColumns: 'repeat(1fr, minmax(300px, 1fr))',
//                     }}
//                 >
//                     <TextField
//                         value={formData.userName}
//                         className='m-1'
//                         label='UserName'
//                         name='userName'
//                         onChange={handleChange}
//                         required // This attribute makes the field required
//                     />
//                     <TextField
//                         value={formData.userID}
//                         className='m-1'
//                         label='UserID'
//                         name='userID'
//                         onChange={handleChange}
//                         required
//                     />
//                     <TextField
//                         value={formData.userYear}
//                         className='m-1'
//                         label='UserYear'
//                         name='userYear'
//                         onChange={handleChange}
//                         required
//                     />
//                     <TextField
//                         value={formData.userEmail}
//                         className='m-1'
//                         label='UserEmail'
//                         name='userEmail'
//                         onChange={handleChange}
//                         required
//                     />
//                     <TextField
//                         value={formData.userPassword}
//                         className='m-1'
//                         label='UserPassword'
//                         name='userPassword'
//                         onChange={handleChange}
//                         required
//                     />
//                     <TextField
//                         value={formData.userPermission}
//                         className='m-1'
//                         label='UserPermission'
//                         name='userPermission'
//                         onChange={handleChange}
//                         required
//                     />
//                     <div style={{ display: 'flex', justifyContent: 'center' }}>
//                         <Button
//                             style={{ width: '50%' }}
//                             variant='contained'
//                             onClick={handleSubmit}
//                             disabled={!isFormValid} // Disable the button if the form is not valid
//                         >
//                             Submit
//                         </Button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default UpdateUser;

import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Header from '../../../Header/Header';
import { useParams } from 'react-router-dom';
import Loader from '../../../loading/loading';

const UpdateUser = () => {
    const { id } = useParams();

    
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        // Fetch user data by ID
        fetch(`https://gproject-63ye.onrender.com/api/user/getuser/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((responseData) => {
                setFormData(responseData[0]);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Fetch error:', error);
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        // Validate and submit updated user data here
        // Use a PUT or PATCH request to update the user data
        const dataToSend = {
            name: formData.name,
            id: formData.id,
            year: formData.year,
            email: formData.email,
            password: formData.password,
            permission: formData.permission,
        };

        fetch(`https://gproject-63ye.onrender.com/api/user/updateUser`, {
            method: 'POST', // Use PUT or PATCH depending on your API
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Handle success
                console.log(data);
            })
            .catch((error) => {
                // Handle error
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <Header />
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {loading ? (
                    <Loader/>
                ) : (
                    <form
                        style={{
                            width: '80%',
                            height: '80%',
                            border: '1px solid',
                            borderRadius: '15px',
                            padding: '15px',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(1fr, minmax(300px, 1fr))',
                        }}
                    >
                        {/* Your form fields */}
                        <TextField
                            value={formData.name}
                            className='m-1'
                            label='UserName'
                            name='name'
                            onChange={handleChange}
                            required // This attribute makes the field required
                        />
                        <TextField
                            value={formData.id}
                            className='m-1'
                            label='UserID'
                            name='id'
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            value={formData.year}
                            className='m-1'
                            label='UserYear'
                            name='year'
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            value={formData.email}
                            className='m-1'
                            label='UserEmail'
                            name='email'
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            value={formData.password}
                            className='m-1'
                            label='UserPassword'
                            name='password'
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            value={formData.permission}
                            className='m-1'
                            label='UserPermission'
                            name='permission'
                            onChange={handleChange}
                            required
                        />
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                style={{ width: '50%' }}
                                variant='contained'
                                onClick={handleSubmit}
                                // disabled={!isFormValid} // Disable the button if the form is not valid
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UpdateUser;
