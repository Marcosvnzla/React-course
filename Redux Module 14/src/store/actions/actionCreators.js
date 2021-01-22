import * as actionTypes from './actionsTypes';

// action creators are functions that create the actions, you have to pass (as return) the type and the other actions.
export const increment = () => {
  return {
    type: actionTypes.INCREMENT
  }
}

export const decrement = () => {
  return {
    type: actionTypes.DECREMENT
  }
}

export const add = (value) => {
  return {
    type: actionTypes.ADD,
    value: value
  }
}

export const subtract = (value) => {
  return {
    type: actionTypes.SUBTRACT,
    value: value
  }
}

export const saveResult = (result) => { // synchronous action creator is passed in the asynchronous one as an action to dispatch.
  return {
    type: actionTypes.STORE_RESULT
  }
}

export const storeResult = (result) => {
  return (dispatch) => { //dispatch is passed automatically by thunk
    setTimeout(() => {
      dispatch(saveResult(result)); 
    }, 2000);
  }
}

export const deleteResult = (id) => {
  return {
    type: actionTypes.DELETE_RESULT,
    resultElId: id
  }
}