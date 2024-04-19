/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const PersonForm = ({ addPerson }) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    addPerson(newName, newNumber);
    setNewName('');
    setNewNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Name: <input value={newName} onChange={(event) => setNewName(event.target.value)} required />
      </div>
      <div>
        Number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} required />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default PersonForm;
