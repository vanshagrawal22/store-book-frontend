import React, { useState, useEffect } from 'react';

const AddClass = () => {
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [className, setClassName] = useState('');
  const [message, setMessage] = useState('');

  // Fetch all schools from backend
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch('https://store-book-x2ww.onrender.com/schools'); //  assumes GET /schools returns all
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

  // Submit class data
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSchool || !className.trim()) {
      setMessage('Both fields are required.');
      return;
    }

    try {
      const response = await fetch('https://store-book-x2ww.onrender.com/classes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ schoolId: selectedSchool, name: className }),
      });

      const result = await response.json();

      if (result.success) {
        setMessage('Class added successfully!');
        setSelectedSchool('');
        setClassName('');
      } else {
        setMessage(result.message || 'Failed to add class.');
      }
    } catch (error) {
      console.error('Error adding class:', error);
      setMessage('Something went wrong.');
    }
  };

  return (
    <div>
      <h2>Add New Class</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Select School:</label>
          <select value={selectedSchool} onChange={(e) => setSelectedSchool(e.target.value)} required>
            <option value="" disabled>-- Select a school --</option>
            {schools.map((school) => (
              <option key={school._id} value={school._id}>
                {school.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Class Name:</label>
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
          />
        </div>

        <button type="submit">Add Class</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default AddClass;
