import * as actionTypes from '../../store/constants/actionTypes';
import { updateObject } from '../../services/utils';

const initialState = {
    products: [],
    loading: false
};

const fetchProductStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const fetchProductSuccess = (state, action) => {
     return updateObject(state, {
        products: action.products,
        loading: false
    });
};

const fetchProductFail = (state, action) => {
    return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PRODUCT_START: return fetchProductStart(state, action);
        case actionTypes.PRODUCT_SUCCESS: return fetchProductSuccess(state, action);
        case actionTypes.PRODUCT_FAIL: return fetchProductFail(state, action);
        default: return state;
    }
};

export default reducer;
