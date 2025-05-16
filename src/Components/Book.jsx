import React, { useState, useEffect } from 'react';

const BookList = ({ classId }) => {
  const [books, setBooks] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`http://localhost:8080/books/class/${classId}`);
        const result = await response.json();

        if (result.success) {
          setBooks(result.data);
          setTotalCost(result.totalCost);
        } else {
          setMessage(result.message || 'No books found.');
        }
      } catch (error) {
        console.error('Error fetching books:', error);
        setMessage('Error loading book data.');
      }
    };

    fetchBooks();
  }, [classId]);

  return (
    <div>
      <h3>Books</h3>
      {message && <p>{message}</p>}
      {books.map((book) => (
        <li key={book._id}>
        <span><strong> {book.title} </strong></span>
        <span> {book.author} </span>
        <span> ₹{book.mrp} </span>
      </li>
      ))}

      {books.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <p><strong>Total Books:</strong> {books.length}</p>
          <p><strong>Total Price:</strong> ₹{totalCost}</p>
        </div>
      )}
    </div>
  );
};

export default BookList;
