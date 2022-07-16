const PersonForm = ({ person }) => {
    return ( 
        <form onSubmit={person.addName}>
        <div>
            Name: <input value={person.newName} type="text" onChange={person.handleName}/>
        </div>
        <br />
        <div>
            Number: <input value={person.newNumber} type="number" onChange={person.handleNumber}/>
        </div>
        <br />
        <div>
            <button type="submit">Add</button>
        </div>
      </form>
     );
}
 
export default PersonForm;