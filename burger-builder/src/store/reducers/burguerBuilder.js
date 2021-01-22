import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICES = {
  meat: 1.3,
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7
}

const initialState = {
  ingredients: null,
  totalPrice: 4,
  building: false,
  error: false,
  orders: [],
  orderLoading: false,
  purchased: false,
  token: null,
  userId: null,
  authError: null,
  authLoading: false,
  authRedirectPath: '/'
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
      } 

    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
      } 
    
    case actionTypes.SET_INGREDIENTS: 
      return {
        ...state,
        ingredients: action.ingredients,
        error: false,
        totalPrice: 4,
        building: false
      }

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        orderLoading: false
      }

    case actionTypes.PURCHASE_BURGER_INIT:
      return {
        ...state,
        orderLoading: true
      }

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId
      }

      return {
        ...state,
        orderLoading: false,
        orders: state.orders.concat(newOrder),
        purchased: true
      }

    case actionTypes.PURCHASE_BURGER_FAIL: 
      return {
        ...state,
        orderLoading: false
      }

    case actionTypes.PURCHASE_BEGIN:
        return {
          ...state,
          purchased: false
        }
    
    //actions related to auth
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        authLoading: true
      }

    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        error: null,
        authLoading: false
      }

    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        authError: action.error,
        authLoading: false
      }
    
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null 
      }

    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return {
        ...state,
        authRedirectPath: action.path
      }

    default:
      return state;
  }
}

export default reducer;