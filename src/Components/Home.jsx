import React, { useState } from 'react';
import AddSchool from './AddSchool';
import AddClass from './AddClass';
import AddBook from './AddBook';
import Class from './Class'
import School from './School';

const Home = () => {
  const [activeForm, setActiveForm] = useState('');
  const [selectedSchoolId, setSelectedSchoolId] = useState('');
  


  const handleSchoolSelect = (id) => {
    setSelectedSchoolId(id);
    setActiveForm(''); // hide add forms when a school is selected
  };
  return (
    <div>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setActiveForm('school')}>Add School</button>
        <button onClick={() => setActiveForm('class')}>Add Class</button>
        <button onClick={() => setActiveForm('book')}>Add Book</button>
        <button onClick={() => setActiveForm('view')}>View Classes</button>
        <button onClick={() => {
          setActiveForm('');
          setSelectedSchoolId('');
        }}>Back</button>
      </div>

      <div>
      {activeForm === 'school' && <AddSchool />}
        {activeForm === 'class' && <AddClass />}
        {activeForm === 'book' && <AddBook />}

        {/* View class flow */}
        {activeForm === 'view' && (
          <>
            <School onSelect={setSelectedSchoolId} />
            {selectedSchoolId && <Class selectedSchool={selectedSchoolId} />}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
