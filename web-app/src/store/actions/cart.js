import * as actionTypes from '../../store/constants/actionTypes';

//add cart action
export const addToCart = (itemCart) => {
  return {
    type: actionTypes.CART_ADD,
    itemCart
  }
}
// Clear cart
export const clearCart = () => {
  return {
    type: actionTypes.CART_CLEAR
  }
}
