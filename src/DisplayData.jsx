import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './styles.css';

function DisplayedData() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('http://localhost:5050/files');
        setFiles(response.data);
      } catch (err) {
        setError('Error fetching files');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const placeholderImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...'; // base64 encoded image or a default placeholder image URL

  return (
    <div className="display-data-container">
      <h2>Uploaded Files</h2>
      {files.length === 0 ? (
        <p>No files uploaded yet.</p>
      ) : (
        <table className="styled-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.id}>
                <td>{file.name}</td>
                <td>{file.description}</td>
                <td>
                  {file.imageUrl ? (
                    <img
                      src={file.imageUrl}
                      alt={file.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = placeholderImage;
                      }}
                    />
                  ) : (
                    <p>No image available</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DisplayedData;
