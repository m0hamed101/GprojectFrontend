import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Header from '../../Header/Header';
import { storage } from '../../../firebase'; // Import the firebase storage instance
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Add_course = () => {
    const [file, setFile] = useState(null);
    const [downloadURL, setDownloadURL] = useState('');
    const [courseName, setCourseName] = useState(''); // State for CourseName
    const [docName, setDocName] = useState(''); // State for DOCName

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleUpload = () => {
        if (file == null) return;
        const imageRef = ref(storage, `files/${file.name}`);

        // Upload the file
        uploadBytes(imageRef, file)
            .then(() => {
                // Once the upload is complete, get the download URL
                return getDownloadURL(imageRef);
            })
            .then((url) => {
                // Now you have the download URL, you can use it as needed
                setDownloadURL(url);
                // console.log('File download URL:', url);
            })
            .catch((error) => {
                // Handle any errors that occurred during the upload
                console.error('Error uploading file:', error);
            });
    };

    const sendFormData = () => {
        // Create a FormData object to send as the request body
        const formData = new FormData();
        formData.append('courseName', courseName);
        formData.append('DocName', docName);
        formData.append('ImageURL', downloadURL); // Use downloadURL from state

        // Send a POST request to your server or API
        fetch('https://gproject-63ye.onrender.com/api/course/createcourse', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                courseName:courseName,
                DocName:docName,
                ImageURL:downloadURL,
            })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // You can handle the response here
            })
            .then((data) => {
                console.log('Response data:', data);
            })
            .catch((error) => {
                console.error('Error sending data:', error);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the form from submitting normally
        // Call handleUpload to upload the file and get the download URL
        handleUpload();
        // Call sendFormData to send the form data
        sendFormData();
    };

    return (
        <div>
            <Header />
            <div
                style={{
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <form
                    onSubmit={handleSubmit} // Handle form submission
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
                    <TextField
                        value={courseName}
                        className="m-1"
                        label="CourseName"
                        name="CourseName"
                        onChange={(e) => setCourseName(e.target.value)} // Update CourseName state
                        required
                    />

                    <TextField
                        value={docName}
                        className="m-1"
                        label="DOCName"
                        name="DOCName"
                        onChange={(e) => setDocName(e.target.value)} // Update DOCName state
                        required
                    />

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
    );
};

export default Add_course;
