import axios from 'axios';
import * as actionTypes from '../../store/constants/actionTypes';
import { clearCart }from '../../store/actions/index';

// Start load data
export const processOrderStart = () => {
  return {
    type: actionTypes.ORDER_START,
    loading : true
  };
};

// Update state after get data successfully
export const postCreateNewOrderSuccess = (orders) => {
  return {
    type: actionTypes.ORDER_CREATE,
    loading: false
  };
};
// Update state after get data successfully
export const fetchOrderSuccess = (orders) => {
   return {
    type: actionTypes.ORDER_SUCCESS,
    orders: orders,
    loading: false
  };
};
// Get order info of detail
export const fetchOrderInfo = (orderInfo) => {
  return {
    type: actionTypes.ORDER_INFO,
    orderInfo: orderInfo,
    loading: false
  };
};
// Update state to fail and error state
export const fetchOrderFail = (error) => {
  return {
    type: actionTypes.ORDER_FAIL,
    error: error
  };
};
// Fetch api
export const fetchOrderList = () => {
  return dispatch => {
    dispatch(processOrderStart());
    axios.get('http://localhost:8000/order/get-list')
      .then(res => {
        dispatch(fetchOrderSuccess(res.data.data));
      })
      .catch(err => {
        dispatch(fetchOrderFail(err));
      });
  };
};

// Fetch api
export const fetchOrderSingleInfo = (id) => {
  console.log(id)
  return dispatch => {
    axios.get(`http://localhost:8000/order/get-info/${id}`)
    .then(res => {
      dispatch(fetchOrderInfo(res.data.data));
    })
    .catch(err => {
      dispatch(fetchOrderFail(err));
    });
  };
};
// Create a new order
export const postCreateNewOrder = (data) => {
  return dispatch => {
    dispatch(processOrderStart());
    axios.post(`http://localhost:8000/order/create`, {...data})
      .then(res => {
        dispatch(postCreateNewOrderSuccess());
        dispatch(clearCart())
      })
      .catch(err => {
        dispatch(fetchOrderFail(err));
      });
  };
};
// Update stae
export const updateStatusOrder = (data) => {
  console.log("updateStatusOrder", data);
  return dispatch => {
    dispatch(processOrderStart());
    axios.post(`http://localhost:8000/order/update/`, data)
      .then(res => {
        dispatch(fetchOrderList());
      })
      .catch(err => {
        dispatch(fetchOrderFail(err));
      });
  };
};
