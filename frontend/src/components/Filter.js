import React from 'react'

const Filter = ({onFilterChange, filterValue}) => {
    return(
        <div>filter shown with <input onChange={onFilterChange} value={filterValue}/></div>
     )
}

export default Filter
