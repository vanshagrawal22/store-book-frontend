// src/components/Class.jsx
import React, { useState, useEffect } from 'react';
import './Class.css'; // External CSS
import Book from './Book'

const Class = ({ selectedSchool }) => {
  const [classes, setClasses] = useState([]);
  const [message, setMessage] = useState('');
  const [openClassId, setOpenClassId] = useState(null); // Track which class is open

  useEffect(() => {
    if (!selectedSchool) return;

    const fetchClasses = async () => {
      try {
        const response = await fetch(`https://store-book-x2ww.onrender.com/classes/${selectedSchool}`);
        const result = await response.json();

        if (result.success) {
          setClasses(result.data);
        } else {
          setMessage('Failed to load classes.');
        }
      } catch (error) {
        console.error('Error fetching classes:', error);
        setMessage('Error fetching class list.');
      }
    };

    fetchClasses();
  }, [selectedSchool]);

  const toggleBooks = (classId) => {
    setOpenClassId(openClassId === classId ? null : classId);
  };

  return (
    <div className="class-container">
      {message && <p className="error">{message}</p>}

      <div className="class-grid">
        {classes.map((cls) => (
          <div key={cls._id} className="class-card">
            <h3>{cls.name}</h3>
            <button onClick={() => toggleBooks(cls._id)}>
              {openClassId === cls._id ? 'Hide Books' : 'View Books'}
            </button>
            {openClassId === cls._id && <Book classId={cls._id} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Class;
