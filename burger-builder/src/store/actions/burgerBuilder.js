// not really necessary for synchronous tasks.
import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addIngredient = (igName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: igName
  }
}

export const removeIngredient = (igName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: igName
  }
}

const setIngredients = (ingredients) => { // sync action creator
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  }
}

const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  }
}

export const initIngredients = () => { //async code
  return dispatch => {
    axios.get('https://react-my-burger-ae98d.firebaseio.com/ingredients.json')
    .then(response => {
      dispatch(setIngredients(response.data));
    })
    .catch(error => {
      dispatch(fetchIngredientsFailed());
    });
  }
}