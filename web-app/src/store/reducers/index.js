import { combineReducers } from 'redux';
import auth from './user';
import notify from './notify';
import product from './product';
import cart from './cart';
import order from './order';

const appReducers = combineReducers({
    notify,
    auth,
    product,
    cart,
    order
});

export default appReducers;
