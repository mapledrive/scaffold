import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import JSZip from 'jszip'; // Assuming JSZip is installed

const App = () => {
  const [filenames, setFilenames] = useState([]);
  const [error, setError] = useState(null);

  const handleFileChange = event => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = event => {
      const zipContent = event.target.result;
      processZip(zipContent);
    };

    reader.onerror = error => {
      setError(`Error reading file: ${error.message}`);
    };

    reader.readAsArrayBuffer(file);
  };

  const processZip = async zipContent => {
    try {
      const zip = await JSZip.loadAsync(zipContent);
      const filenames = [];
      zip.forEach(filename => {
        filenames.push(filename);
      });
      setFilenames(filenames);
    } catch (error) {
      setError(`Error processing zip: ${error.message}`);
    }
  };

  return (
    <>
      <input type='file' accept='.zip' onChange={handleFileChange} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {filenames.length > 0 && (
        <div>
          {filenames.map(filename => (
            <li key={filename}>{filename}</li>
          ))}
        </div>
      )}
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

// In summary, this React component provides a user interface for uploading ZIP files. 
// When a valid ZIP file is uploaded, 
// it extracts the filenames within the ZIP and displays them as a list.
// Установить на Vite.js и jszip
