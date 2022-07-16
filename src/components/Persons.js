const Persons = ({filter, persons, deletePerson}) => {
    


    const filterList = filter.map(elem => <li key={elem.id}><strong>Name:</strong> {elem.name} <strong>Number:</strong> {elem.number}</li>)
    const personsList = persons.map(elem => <li key={elem.id}><strong>Name:</strong> {elem.name} <strong>Number:</strong> {elem.number} <button id={elem.id} onClick={deletePerson}>Delete</button></li>)

    return ( 
        <ul>{filter.length > 0 ? filterList : personsList}</ul>
     );
}
 
export default Persons;