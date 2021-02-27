import * as actionTypes from '../../store/constants/actionTypes';
import { updateObject } from '../../services/utils';

const initialState = {
    orders: [],
    orderInfo: {},
    error: [],
    loading: false
};

const postCreateNewOrder = (state, action) => {
    return updateObject(state, { loading: false });
};

const orderStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const postCreateNewOrderFail = (state, action) => {
    return updateObject(state, { error: action.error.response.data, loading: false });
};

const fetchOrderSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false
    });
};

const fetchOrderInfoSuccess = (state, action) => {
    return updateObject(state, {
        orderInfo: action.orderInfo,
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ORDER_CREATE: return postCreateNewOrder(state, action);
        case actionTypes.ORDER_FAIL: return postCreateNewOrderFail(state, action);
        case actionTypes.ORDER_SUCCESS: return fetchOrderSuccess(state, action);
        case actionTypes.ORDER_START: return orderStart(state, action);
        case actionTypes.ORDER_INFO: return fetchOrderInfoSuccess(state, action);
        default: return state;
    }
};

export default reducer;
