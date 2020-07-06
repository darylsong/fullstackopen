import React, { useState, useEffect } from 'react'
import personService from '../services/persons'
import Message from './Message'
const Notification = Message.Notification
const Warning = Message.Warning

const Persons = ({ persons, handleDeletePerson }) => {
    return (
        <div>
            {persons.map(person => (
                <div key={person.id}>
                    {person.name} {person.number}
                    <button onClick={handleDeletePerson} id={person.id} name={person.name} >delete</button>
                </div>
            ))}
        </div>
    )
}

const Filter = ({ searchTerm, handleSearchTermChange }) => {
    return (
        <div>
            filter shown with <input value={searchTerm} onChange={handleSearchTermChange} />
        </div>
    )
}

const PersonForm = ({ newName, newNumber, handleNameInputChange, handleNumberInputChange, addName }) => {
    return (
        <form>
            <div>
                name: <input value={newName} onChange={handleNameInputChange} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberInputChange} />
            </div>
            <div>
                <button type="submit" onClick={addName}>add</button>
            </div>
        </form>
    )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ notification, setNotification ] = useState('')
  const [ warning, setWarning ] = useState('')

  useEffect(() => {
      personService
        .getAll()
        .then(initialPersons => setPersons(initialPersons))
  }, [])

  const handleNameInputChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const nameAlreadyExists = () => {
      let alreadyAdded = false
      persons.forEach(person => {
          if (person.name === newName) {
              alreadyAdded = true
          }
      })
      return alreadyAdded
  }

  const addName = (event) => {
    event.preventDefault()

    if (!nameAlreadyExists()) {
        const personToBeAdded = { name: newName, number: newNumber }
        personService
            .create(personToBeAdded)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                setNewName('')
                setNewNumber('')
                setNotification(`Added ${returnedPerson.name}`)
                setTimeout(() => setNotification(''), 5000)
            })
            .catch(error => {
                setWarning(error.response.data.error)
                setTimeout(() => setWarning(''), 5000)
            })
    } else {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
            const prevPerson = persons.find(p => p.name === newName)
            const newPerson = { ...prevPerson, number: newNumber }

            personService
                .update(prevPerson.id, newPerson)
                .then(returnedPerson => {
                    setPersons(persons.map(p => p.id === prevPerson.id ? returnedPerson : p))
                })
                .catch(error => {
                    setPersons(persons.filter(p => p.id !== prevPerson.id))
                    setNewName('')
                    setNewNumber('')
                    setWarning(`Information of ${prevPerson.name} has already been removed from server`)
                    setTimeout(() => setWarning(''), 5000)
                })
        } else {
            setNewName('')
            setNewNumber('')
        }
    } 
  }

  const nameContainsTerm = (name, searchTerm) => {
    if (name.toLowerCase().indexOf(searchTerm.toLowerCase()) === -1) {
        return false
    } else {
        return true
    }
  }

  const personsToShow = persons.filter(person => {
      return nameContainsTerm(person.name, searchTerm)
  })

  const handleDeletePerson = (event) => {
    const name = event.target.attributes.name.value
    const id = event.target.attributes.id.value

    if (window.confirm(`Do you really want to delete ${name}?`)) {
        personService
        .remove(id)
        .then(() => {
            personService
            .getAll()
            .then(returnedPersons => setPersons(returnedPersons))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Warning message={warning} />
      <Filter searchTerm={searchTerm} handleSearchTermChange={handleSearchTermChange}/>
      <h3>Add a new</h3>
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        handleNameInputChange={handleNameInputChange}
        handleNumberInputChange={handleNumberInputChange}
        addName={addName}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleDeletePerson={handleDeletePerson} />  
    </div>
  )
}

export default App