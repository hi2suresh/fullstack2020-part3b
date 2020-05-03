import React from 'react'

const Notification = ({ message}) => {
    if (message.length === 0) {
        return null
    }

    return (
        //Set the class name based on add or error message
        <div className={message.toLowerCase().includes('add') ? 'note' : 'error'}>
            {message}
        </div>
    )

}

export default Notification
