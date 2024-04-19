/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import numbersService from './services/numbers';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    numbersService
      .getAll()
      .then(InitialPersons => {
        setPersons(InitialPersons);
      });
  }, []);

  const addPerson = (newName, newNumber) => {
    const existingPerson = persons.find(person => person.name === newName);

    if (!existingPerson) {
      const personObject = {
        name: newName,
        number: newNumber
      };

      numbersService
        .create(personObject)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson));
          setNotification({ error: false, message: `${addedPerson.name} added to phonebook` });
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        })
        .catch(error => {
          setNotification({ error: true, message: `Error adding person: ${error.message}` });
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        });
    } else {
      if (window.confirm(`${existingPerson.name} is already added to the phonebook. Replace the old number with the new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        numbersService
          .update(existingPerson.id, updatedPerson)
          .then(updatedPerson => {
            setPersons(persons.map(person =>
              person.id !== existingPerson.id ? person : updatedPerson
            ));
            setNotification({ error: false, message: `Number updated for ${existingPerson.name}` });
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          })
          .catch(error => {
            setNotification({ error: true, message: `Error updating number: ${error.message}` });
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          });
      }
    }
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const handleRemovePerson = id => {
    const personToRemove = persons.find(person => person.id === id);

    if (!window.confirm(`Remove ${personToRemove.name} from phonebook?`)) {
      return;
    }

    numbersService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id));
        setNotification({ error: false, message: `Removed ${personToRemove.name} from phonebook` });
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      })
      .catch(error => {
        setNotification({ error: true, message: `Error removing person: ${error.message}` });
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {notification && (
        <div style={{ color: notification.error ? 'red' : 'green' }}>
          {notification.message}
        </div>
      )}
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} handleRemovePerson={handleRemovePerson} />
    </div>
  );
};

export default App;
