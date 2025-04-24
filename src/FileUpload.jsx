import React, { useState } from 'react';
import axios from 'axios';

import './styles.css';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!file || !title || !description) {
      setMessage('All fields are required!');
      return;
    }
  
    const formData = new FormData();
    formData.append('image', file);  // 'image' matches the backend field name
    formData.append('name', title);
    formData.append('description', description);
  
    // Log payload
    console.log('📦 Payload to be sent:');
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
  
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5050/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (res.status === 200) {
        setMessage('✅ File uploaded successfully!');
        setTitle('');
        setDescription('');
        setFile(null);
      } else {
        setMessage('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Upload failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Upload a File</h2>
      <form className="file-upload-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="file"
          accept="*/*"
          onChange={handleFileChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default FileUpload;
