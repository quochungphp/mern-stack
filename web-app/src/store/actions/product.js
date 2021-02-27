import axios from 'axios';
import * as actionTypes from '../../store/constants/actionTypes';

export const fetchProductStart = () => {
  return {
    type: actionTypes.PRODUCT_START
  };
};

export const fetchProductSuccess = (products) => {
  return {
    type: actionTypes.PRODUCT_SUCCESS,
    products: products
  };
};

export const fetchProductFail = (error) => {
  return {
    type: actionTypes.PRODUCT_FAIL,
    error: error
  };
};

export const fetchProduct = () => {
  return dispatch => {
    dispatch(fetchProductStart());

    axios.get('/product/product-list')
      .then(res => {
        dispatch(fetchProductSuccess(res.data.data));
      })
      .catch(err => {
        dispatch(fetchProductFail(err));
      });
  };
};
