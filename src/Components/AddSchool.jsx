// src/components/AddSchool.jsx
import React, { useState } from 'react';

const AddSchool = () => {
  const [name, setName] = useState('');   // name of the school
  const [address, setAddress] = useState('');  // address of the school
  const [message, setMessage] = useState('');  // created or error

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {   // check for non empty field
      setMessage('School name is required.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/schools', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, address }),   // sending data to backend in correct format
      });

      const result = await response.json();

      if (result.success) {
        setMessage('School added successfully!');
        setName('');
        setAddress('');
      } else {
        setMessage(result.message || 'Failed to add school.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Something went wrong.');
    }
  };

  return (
    <div>
      <h2>Add New School</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>School Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Address (optional):</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <button type="submit">Add School</button>
      </form>

      {message && <p>{message}</p>}

    </div>
  );
};

export default AddSchool;
