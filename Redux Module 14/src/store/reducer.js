import * as actionTypes from './actions/actionsTypes'; // import *, creates an object with the propertios of everything that's inside the imported file.

const initialState = {
    counter: 0,
    results: []
}
// the reducer returns the state object itself, so it always has to be changed in an inmutable way. 
// remember that the spread operator does not create deep clones.
const reducer = (state = initialState, action) => {
    if (action.type === actionTypes.INCREMENT) {
        return {
            ...state,
            counter: state.counter + 1
        }
    }

    if (action.type === actionTypes.DECREMENT) {
        return {
            ...state,
            counter: state.counter - 1
        }
    }

    if (action.type === actionTypes.ADD) {
        return {
            ...state,
            counter: state.counter + action.value
        }
    }

    if (action.type === actionTypes.SUBTRACT) {
        return {
            ...state,
            counter: state.counter - action.value
        }
    }

    if (action.type === actionTypes.STORE_RESULT) {
        return {
            ...state,
            results: state.results.concat({id: Math.random() + new Date(), value: state.counter}) //concat is like push but it returns a new array.
        }
    }

    if (action.type === actionTypes.DELETE_RESULT) {
        const resultsCopy = state.results.filter(result => result.id !== action.resultElId);
        return {
            ...state,
            results: resultsCopy
        }
    }

    return state;
};

export default reducer;