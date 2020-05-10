import React, { useState, useEffect } from 'react'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Filter from './Filter'
import Notification from './Notification'
import HandleRest from '../services/HandleRest'

const App = () => {
    const [persons, setPersons] = useState([])

    useEffect(() => {
        HandleRest
          .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
          })
      }, [])
   
    const [showAll, setShowAll] = useState(true);

    const [filterValue, SetFilterValue] = useState('');
    const onFilterChange = event => {
        SetFilterValue(event.target.value);
        setShowAll(false);
    }

    const [notificationMessage, SetNotificationMessage] = useState('')

    let messageClassName = 'note';

    const onHandleAdd = (event) => {
        event.preventDefault();
        const existingPerson = persons.find(person => person.name === newName);
        if (existingPerson) {
            /*if (window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)) {
                const updatedDetails = { ...existingPerson, number: newNumber }
                HandleRest.update(existingPerson.id, updatedDetails)
                    .then(response => setPersons(persons.map(person => person.id === existingPerson.id ? updatedDetails : person)))
                    .catch((error) => {
                        messageClassName = 'error';
                        SetNotificationMessage(
                          `Information of '${existingPerson.name}' has already been removed from server`
                        );
                        setTimeout(() => {
                            SetNotificationMessage('');
                          messageClassName='note';
                        }, 4000);
                        setPersons(persons.filter(person => person.id !== existingPerson.id));
                      })
            }*/

            SetNotificationMessage(
                `Information of '${existingPerson.name}' is already there in the server`
              );
              setTimeout(() => {
                  SetNotificationMessage('');
                messageClassName='note';
              }, 4000);

        } else {
            const person = { name: newName, number: newNumber }
            HandleRest.create(person)
                .then((response) => {
                    console.log(response);
                    setPersons(persons.concat(person));
                    SetNotificationMessage(`Added ${person.name}`)
                    setTimeout(() => {
                        SetNotificationMessage('')
                    }, 3000)
                });
                HandleRest
                .getAll()
                  .then(initialPersons => {
                      setPersons(initialPersons)
                })

        }
        setNewName('')
        setNewNumber('')
        setShowAll(true)
    }

    const [newName, setNewName] = useState('')
    const onNameChange = event => {
        setNewName(event.target.value);
    }

    const [newNumber, setNewNumber] = useState('')
    const onNumberChange = event => setNewNumber(event.target.value)
    // console.log(persons);

    const showThesePersons = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notificationMessage}/>
            <Filter onFilterChange={onFilterChange} filterValue={filterValue} />
            <h2>Add a new Name and Number</h2>
            <PersonForm onHandleAdd={onHandleAdd} onNameChange={onNameChange}
                onNumberChange={onNumberChange} newName={newName} newNumber={newNumber} />
            <h2>Numbers</h2>
            <Persons showThesePersons={showThesePersons} setPersons={setPersons} />
        </div>
    )
}

export default App