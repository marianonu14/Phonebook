import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import contactService from './services/contacts'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ filter, setFilter ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  
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

  const addName = (e) => {
    e.preventDefault()
    const arrayTest = persons.find(elem => elem.name.toLowerCase() === newName.toLowerCase())
    if (arrayTest){
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
          const updateObject = {
            name: arrayTest.name,
            number: newNumber,
            id: arrayTest.id,
        }
        const arrayFilter = persons.filter(elem => elem.name.toLowerCase() !== newName.toLowerCase())
        contactService.update(arrayTest.id, updateObject)
        setPersons(arrayFilter.concat(updateObject))
        }
    } else {
        const personObject = {
            name: newName,
            number: newNumber,
            id: Date.now()
        }
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