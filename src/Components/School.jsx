// src/components/School.jsx
import React, { useEffect, useState } from 'react';

const School = ({ onSelect }) => {
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [message, setMessage] = useState('');

  // Fetch all schools on mount
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch('http://localhost:8080/schools'); // Adjust if route is different
        const result = await response.json();

        if (result.success) {
          setSchools(result.data);
        } else {
          setMessage('Failed to load schools.');
        }
      } catch (error) {
        console.error('Error fetching schools:', error);
        setMessage('Error fetching school list.');
      }
    };

    fetchSchools();
  }, []);

  const handleSchoolChange = (e) => {
    const selectedId = e.target.value;
    setSelectedSchool(selectedId);
    onSelect && onSelect(selectedId); // callback to parent if needed
  };

  return (
    <div>
      <h2>Select a School</h2>
      <select value={selectedSchool} onChange={handleSchoolChange}>
        <option value="" disabled>-- Select a School --</option>
        {schools.map((school) => (
          <option key={school._id} value={school._id}>
            {school.name}
          </option>
        ))}
      </select>

      {/* {selectedSchool && (
        <p>
          Selected School ID: <strong>{selectedSchool}</strong>
        </p>
      )} */}

      {/* {message && <p>{message}</p>} */}
    </div>
  );
};

export default School;
