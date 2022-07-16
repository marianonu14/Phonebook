import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import contactService from './services/contacts'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ filter, setFilter ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ addNew, setAddNew ] = useState(false)
  const [ message, setMessage ] = useState('')
  
  useEffect( () => {
    contactService
    .getAll()
    .then(response => {
      setPersons(response.data)
    })}, [])

  const handleName = (e) => {
    setNewName(e.target.value);
  }

  const handleNumber = (e) => {
    setNewNumber(e.target.value);
  }

  const handleFilterName = (e) => {
    const input = e.target.value.toLowerCase()
    const filterArray = persons.filter(elem => elem.name.toLowerCase().indexOf(input) === 0)
    setFilter(filterArray)
  }

  const resetForm = () => {
    setNewName('')
    setNewNumber('')
  }

  const showMessage = () => {
    setAddNew(true)
    setTimeout(() => {
      setAddNew(false)
      setMessage('')
    }, 2000);
  }

  const addName = (e) => {
    e.preventDefault()
    const person = persons.find(elem => elem.name.toLowerCase() === newName.toLowerCase())
    if (person){
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
          const updateObject = {
            name: person.name,
            number: newNumber,
            id: person.id,
        }
        contactService.update(person.id, updateObject)
        const arrayFilter = persons.filter(elem => elem.name.toLowerCase() !== newName.toLowerCase())
        setPersons(arrayFilter.concat(updateObject))
        }
    } else {
        const personObject = {
            name: newName,
            number: newNumber,
            id: Date.now()
        }
        setMessage(newName)
        showMessage(newName)
        contactService.create(personObject);
        setFilter([])
        setPersons(persons.concat(personObject))
    } 
    resetForm()
  }

  const deletePerson = (e) => {
    const newArray = persons.find(elem => elem.id === Number(e.target.id))
    const newArrayPerson = persons.filter(elem => elem.id !== Number(e.target.id))
    if(window.confirm(`Delete ${newArray.name}`)){
      contactService.deleteContact(e.target.id)
      setPersons(newArrayPerson) 
    }
  }

  const objectPerson = {addName, newName, handleName, newNumber, handleNumber}

  return (
    <div>
      <h1>Phonebook</h1>
      {addNew ? <Notification name={message} /> : ''}
      <Filter function={handleFilterName} />
      <br />
      <h2>Add a New Contact</h2>
      <PersonForm person={objectPerson} />
      <h2>Numbers</h2>
      {persons.length === 0 ? 'Loading...' : <Persons filter={filter} persons={persons} deletePerson={deletePerson} />}
    </div>
  )
}

export default App