import React, { useState, useEffect } from 'react';

const AddBook = () => {
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [mrp, setMrp] = useState('');
  const [message, setMessage] = useState('');

  // Fetch schools on mount
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch('http://localhost:8080/schools');
        const result = await response.json();
        if (result.success) setSchools(result.data);
        else setMessage('Failed to load schools.');
      } catch (error) {
        console.error('Error fetching schools:', error);
        setMessage('Error fetching school list.');
      }
    };

    fetchSchools();
  }, []);

  // Fetch classes when school is selected
  useEffect(() => {
    if (!selectedSchool) return;

    const fetchClasses = async () => {
      try {
        const response = await fetch(`http://localhost:8080/classes/${selectedSchool}`);
        const result = await response.json();
        if (result.success) setClasses(result.data);
        else setMessage('Failed to load classes.');
      } catch (error) {
        console.error('Error fetching classes:', error);
        setMessage('Error fetching class list.');
      }
    };

    fetchClasses();
  }, [selectedSchool]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedClass || !title || !author || !mrp) {
      setMessage('All fields are required.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          classId: selectedClass,
          title,
          author,
          mrp: Number(mrp),
        }),
      });

      const result = await response.json();
    //   console.log("result is " , result)

      if (result.success) {
        setMessage('Book added successfully!');
        setTitle('');
        setAuthor('');
        setMrp('');
        setSelectedSchool('');
        setSelectedClass('');
        setClasses([]);
      } else {
        setMessage(result.message || 'Failed to add book.');
      }
    } catch (error) {
      console.error('Error adding book:', error);
      setMessage('Something went wrong.');
    }
  };

  return (
    <div>
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        {/* School Selection */}
        <div>
          <label>Select School:</label>
          <select
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
            required
          >
            <option value="" disabled>-- Select a school --</option>
            {schools.map((school) => (
              <option key={school._id} value={school._id}>
                {school.name}
              </option>
            ))}
          </select>
        </div>

        {/* Class Dropdown — based on school */}
        <div>
          <label>Select Class:</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            required
            disabled={!classes.length}
          >
            <option value="" disabled>-- Select a class --</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.name}
              </option>
            ))}
          </select>
        </div>

        {/* Book Info */}
        <div>
          <label>Book Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div>
          <label>Author:</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>

        <div>
          <label>MRP:</label>
          <input type="number" value={mrp} onChange={(e) => setMrp(e.target.value)} required />
        </div>

        <button type="submit">Add Book</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default AddBook;
