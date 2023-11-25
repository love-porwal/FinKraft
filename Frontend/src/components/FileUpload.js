import React, { useState } from 'react';
import axios from 'axios';
import './FileUpload.css'; // Import the CSS file

const FileUpload = ({ fetchFiles }) => {
  const [file, setFile] = useState(null);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Trigger a re-fetch of the file list after successful upload
      fetchFiles();
      alert('File uploaded successfully');
      window.location.reload();
    } catch (error) {
      console.error('Error uploading file:', error.message);
      alert('File uploaded successfully');
      window.location.reload();
    }
  };

  return (
    <div className="file-upload-container">
      <h2>File Upload</h2>
      <form onSubmit={onFormSubmit}>
        <input type="file" onChange={onFileChange} className="file-input" />
        <button type="submit" className="upload-button">Upload</button>
      </form>
    </div>
  );
};

export default FileUpload;
