import React from 'react';
import './Style.css';
import OrderBody  from './OrderBody';

const order = (props) => {
    return (
        <OrderBody {...props} />
    )
};

export default order;
