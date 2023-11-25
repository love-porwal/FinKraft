import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FileList.css';

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/files');
        setFiles(response.data.files);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching files:', error.message);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div className="file-list-container">
      <h2>File List</h2>
      {loading && <div className="loader">Loading...</div>}
      <ul>
        {files.map((file, index) => (
          <li key={index} className="file-list-item">{file}</li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
