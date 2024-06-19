import React, { useState, useEffect } from 'react';
import {TextField} from '@mui/material';
import { Button } from '@mui/material';
import Header from '../../Header/Header';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AddCourse = () => {
    const [file, setFile] = useState(null);
    const [downloadURL, setDownloadURL] = useState('');
    const [courseName, setCourseName] = useState('');
    const [docName, setDocName] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); // Track form submission state

    useEffect(() => {
        console.log(downloadURL);
    }, [downloadURL]); // Log downloadURL whenever it changes

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleUpload = () => {
        if (file === null) return;
        setIsUploading(true);
        const imageRef = ref(storage, `files/${file.name}`);

        uploadBytes(imageRef, file)
            .then(() => getDownloadURL(imageRef))
            .then((url) => {
                setDownloadURL(url);
                setIsUploading(false);
                alert('File uploaded successfully!');
            })
            .catch((error) => {
                setIsUploading(false);
                console.error('Error uploading file:', error);
                alert('An error occurred while uploading the file.');
            });
    };

    const sendFormData = () => {
        setIsSubmitting(true); // Set submitting state to true
        fetch('https://gproject-63ye.onrender.com/api/course/createcourse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                courseName: courseName,
                DocName: docName,
                ImageURL: downloadURL, // Use ImageURL as expected by backend
                materials: []
            })
        })
            .then((response) => {
                setIsSubmitting(false); // Reset submitting state
                if (!response.ok) {
                    alert('Error');
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                alert('Course added successfully!');
                setCourseName(''); // Clear input fields
                setDocName('');
                setDownloadURL('');
            })
            .catch((error) => {
                setIsSubmitting(false); // Reset submitting state
                console.error('Error sending data:', error);
                alert('An error occurred while adding the course.');
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (file === null) {
            alert('Please select a file');
            return;
        }
        sendFormData();
    };

    return (
        <div style={{ width: "100%" }}>
            <Header />
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "80vh",
            }}>
                <form onSubmit={handleSubmit} style={{
                    maxWidth: "600px",
                    width: "100%",
                    padding: "20px",
                    border: '1px solid',
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    background: "#fff",
                    textAlign: "center",
                }}>
                <div className="flex w-1/1">
                    <div style={{margin:'5px',width:"100%"}}>
                        <TextField
                            value={courseName}
                            label="Course Name"
                            name="courseName"
                            onChange={(e) => setCourseName(e.target.value)}
                            required
                            fullWidth
                        />
                    </div>
                    <div style={{margin:'5px',width:"100%"}}>
                    <TextField
                        value={docName}
                        className="m-1"
                        label="DOC Name"
                        name="docName"
                        onChange={(e) => setDocName(e.target.value)}
                        required
                        fullWidth
                    />
                    </div>
                    </div>
                    <div className="file m-3 ">
                        <input type="file" onChange={handleFileChange} style={{maxWidth:"50%"}} />
                        <Button
                            style={{ border: '1px solid blue',maxWidth:"50%" }}
                            onClick={handleUpload}
                            disabled={isUploading}
                            fullWidth
                        >
                            {isUploading ? 'Uploading...' : 'Upload'}
                        </Button>
                    </div>
                    <Button
                        type="submit"
                        style={{ border: '1px solid blue' }}
                        disabled={isUploading || isSubmitting}
                        fullWidth
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                </form>
            </div>
        </div>

    );
};

export default AddCourse;
