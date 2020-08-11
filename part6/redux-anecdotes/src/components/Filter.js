import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const VisibilityFilter = (props) => {
    const handleTextChange = (event) => {
        props.filterChange(event.target.value)
    }

    return (
        <div>
          filter
          <input type="text" onChange={handleTextChange} />
        </div>
    )
}

export default connect(
    null,
    { filterChange }
)(VisibilityFilter)