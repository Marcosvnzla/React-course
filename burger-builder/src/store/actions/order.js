import * as actionTypes from './actionTypes';
import axios from 'axios';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  }
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  }
};

export const purchaseBurgerInit = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_INIT
  }
};

export const purchaseBurgerStart = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerInit());
    axios.post('/orders.json?auth=' + token, orderData)
    .then(response => {
      console.log(response.data);
      dispatch(purchaseBurgerSuccess(response.data, orderData));
    })
    .catch(error => {
      dispatch(purchaseBurgerFail(error));
    })
  };
};

export const purchaseBegin = () => {
  return {
    type: actionTypes.PURCHASE_BEGIN
  }
}