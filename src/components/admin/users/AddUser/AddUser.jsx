import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Header from '../../../Header/Header';


const AddUser = () => {
    
    const initialFormData = {
        userName: '',
        userID: '',
        userYear: '',
        userEmail: '',
        userPassword: '',
        userPermission: '',
    };
    const [formData, setFormData] = useState(initialFormData);


    const [isFormValid, setIsFormValid] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        validateForm()
    };
    // console.log(formData);
    const validateForm = () => {
        // Check if all required fields are filled
        const isValid = Object.values(formData).every((value) => value.trim() !== '');
        if (isValid) {
            setIsFormValid(true);
        }else{
            setIsFormValid(false);
        }
    };

    const handleSubmit = () => {
        // Validate the form before submitting
        

        
            // Form is valid, proceed with submitting data
            const dataToSend = {
                name: formData.userName,
                id: formData.userID,
                year: formData.userYear,
                email: formData.userEmail,
                password: formData.userPassword,
                permission: formData.userPermission,
            };

            // Send the data using the Fetch API
            fetch('https://gproject-63ye.onrender.com/api/user/createUser', {
                method: 'POST',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            })
                .then((response) => response.json())
                .then((data) => {
                    // Handle the response data as needed
                    console.log(data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        
    };

    return (
        <div>
        <Header/>
        <div style={{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <form
                style={{
                    width:"80%",
                    height: '80%',
                    border: '1px solid',
                    borderRadius: '15px',
                    padding: '15px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(1fr, minmax(300px, 1fr))',
                }}
            >
                <TextField
                value={formData.userName}
                    className='m-1'
                    label='UserName'
                    name='userName'
                    onChange={handleChange}
                    required
                />
                <TextField
                value={formData.userID}
                    className='m-1'
                    label='UserID'
                    name='userID'
                    onChange={handleChange}
                    required
                />
                <TextField
                value={formData.userYear}
                    className='m-1'
                    label='UserYear'
                    name='userYear'
                    onChange={handleChange}
                    required
                />
                <TextField
                value={formData.userEmail}
                    className='m-1'
                    label='UserEmail'
                    name='userEmail'
                    onChange={handleChange}
                    required
                />
                <TextField
                value={formData.userPassword}
                    className='m-1'
                    label='UserPassword'
                    name='userPassword'
                    onChange={handleChange}
                    required
                />
                <TextField
                value={formData.userPermission}
                    className='m-1'
                    label='UserPermission'
                    name='userPermission'
                    onChange={handleChange}
                    required
                />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        style={{ width: '50%' }}
                        variant='contained'
                        onClick={handleSubmit}
                        disabled={!isFormValid} // Disable the button if the form is not valid
                    >
                        Submit
                    </Button>
                </div>
            </form>
            </div>
        </div>
    );
};

export default AddUser;
