import { useState, useEffect } from 'react'
import Form from './components/Form'
import Filter from './components/Filter'
import Persons from './components/Persons'
import axios from 'axios'
import peopleService from './services/people'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
  const [persons, setPersons] = useState([]
  ) 

    useEffect(() => {
      peopleService
        .getAll()
        .then(data => {
          setPersons(data) 
        })
    }, [])


  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('') 
  const [notification, setNotification] = useState('')
  const [filter, setFilter] = useState('')
  const [error, setErrorMessage] = useState('')


  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }


    const addPerson = (event) => {
      event.preventDefault()
      const personObject = {
        name: newName,
        number: newNumber
        // Do NOT set id here
      }
      if (persons.some(person => person.name === newName)) {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          const personToUpdate = persons.find(person => person.name === newName)
          peopleService.update(personToUpdate.id, { ...personToUpdate, number: newNumber })
            .then(response => {
              setPersons(persons.map(person => person.id !== response.id ? person : response))

            })
            .catch(error => {
              setErrorMessage(`Information of ${newName} has already been removed from server`)
            })
        }
        return
      }
      

      peopleService.create(personObject)
        .then(response => {
          setPersons(persons.concat(response)) // response has backend id
          setNewNumber('')
          setNewName('')
        })
        .catch(error => {
          console.error(error)
        })
      
      setNotification(`Added ${newName}`)

    }

  const personsToShow = Array.isArray(persons)
    ? persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : []

  const handleDelete = id => {
    if (window.confirm('Delete this person?')) {
      peopleService.remove(id)
        .then(() => {
          // After deletion, fetch the updated list from backend
          peopleService.getAll().then(data => setPersons(data))
        })
        .catch(error => {
          alert('Error deleting person')
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Error message={error} />
      <Filter filter={filter} setFilter={setFilter} />
      <Form addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App