import React from 'react'

const Warning = ({ message }) => {
    if (!message) {
        return null
    }

    return (
        <div className='warning'>
            {message}
        </div>
    )

}

export default Warning