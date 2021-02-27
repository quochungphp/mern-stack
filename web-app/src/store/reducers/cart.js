import * as actionTypes from '../../store/constants/actionTypes';
import { updateObject } from '../../services/utils';

const initialState = {
    carts: [],
    total:0,
    loading: false
};

const addToCart = (state, action) => {

    if (action.type === actionTypes.CART_ADD) {

        let checkItemInCart = state.carts.find(item => item._id === action.itemCart._id)
        let cartItem = action.itemCart
        //check if the action id exists in the addedItems

        // Update current item into cart
        if (checkItemInCart) {
            checkItemInCart.quantity = parseInt(checkItemInCart.quantity)+1
            //calculating the total
            let newTotal = state.total + parseInt(checkItemInCart.price)

            return {
                ...state,
                carts: [...state.carts],
                total: newTotal,
                loading: false
            }

        }
        // Add an item into cart
        else {
            console.log("cartItem", cartItem)
            cartItem.quantity = isNaN(cartItem.quantity) ? 1 : 0
            return {
                ...state,
                carts: [...state.carts, cartItem],
                total: state.total + parseInt(cartItem.price),
                loading: false
            }
        }
    }
    return state
};

const clearCart = (state, action) => {
    return updateObject(state, {
        carts: [],
        loading: false,
        total:0
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CART_ADD: return addToCart(state, action);
        case actionTypes.CART_CLEAR: return clearCart(state, action);
        default: return state;
    }
};

export default reducer;
