const notificationReducer = (state = '', action) => {
    switch(action.type){
      case 'SET_NOTIFICATION':
        return action.message
      case 'RESET_NOTIFICATION':
          return ''
      default:
        return state
    }
}

var lastTimeoutID

export const setNotification = (message, time) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            message
        })

        if (lastTimeoutID) {
            console.log(lastTimeoutID)
            window.clearTimeout(lastTimeoutID)
        }

        lastTimeoutID = window.setTimeout(() => dispatch(resetNotification()), time * 1000)
    }
}

export const resetNotification = () => {
    return {
        type: 'RESET_NOTIFICATION',
        message: ''
    }
}

export default notificationReducer