import React from 'react'

const PersonForm = (props) => {
    const  onHandleAdd = props.onHandleAdd;
    const onNameChange = props.onNameChange;
    const onNumberChange = props.onNumberChange;
    const newName = props.newName;
    const newNumber = props.newNumber;
    return(
        <form onSubmit={onHandleAdd}> 
        <div>
          name: <input onChange={onNameChange} value={newName} />
        </div>
        <div>number: <input onChange={onNumberChange} value={newNumber}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}


export default PersonForm