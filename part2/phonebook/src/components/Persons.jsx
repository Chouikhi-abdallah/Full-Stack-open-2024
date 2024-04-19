/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const Persons = ({ persons, filter,handleRemovePerson }) => {
  return (
    <ul>
      {persons
        .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
        .map(person => (
          <li key={person.id}>
            {person.name} - {person.number}
            <button onClick={() => handleRemovePerson(person.id)}>delete</button>

          </li>

        ))}
    </ul>
  );
};

export default Persons;
