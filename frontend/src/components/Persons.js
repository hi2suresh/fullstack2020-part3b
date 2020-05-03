import React from 'react'
import HandleRest from '../services/HandleRest'


const Persons = ({ showThesePersons, setPersons}) => {

    const onHandleDelete = (id, name) => {
        console.log(id);
        if (window.confirm(`Do you really want to delete ${name}?`)) {
            HandleRest.remove(id)
                .then(response => {
                    console.log(response);
                    HandleRest
                    .getAll()
                      .then(response => {
                          setPersons(response)
                    })
                });
        }
    }

    return (
        <>
            {showThesePersons.map((obj) => {
                return <p key={obj.name}>{obj.name} {obj.number}
                    <button key={obj.id} onClick={() => onHandleDelete(obj.id, obj.name)} id={obj.id}>delete</button> </p>
            })}

        </>
    )
}
export default Persons