import React from 'react';
import './Style.css';

const orderInfo = ({orderInfo}) => {
  const items = orderInfo.order ? orderInfo.order.map((el, i) => {
    return <tr key={i}>
      <td>
        <div className="product-item">
          <a className="product-thumb" href="#">
            <img src={el.image.thumb} alt="" width="80" height="80" />
          </a>
          <div className="product-info">
            <h4 className="product-title">
              <a href="#"> {el.name}</a>
            </h4>
          </div>
        </div>
      </td>
      <td className="text-center">
        <div className="count-input">
          {el.quantity}
        </div>
      </td>
      <td className="text-center text-lg text-medium">{el.price}</td>
    </tr>
  }) : ""

  return (

    <div>
      <div className="container padding-bottom-3x mb-1">
        <div className="table-responsive shopping-cart">
          <table className="table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th className="text-center">Quantity</th>
                <th className="text-center">Price</th>
              </tr>
            </thead>
            <tbody>
              {items}
            </tbody>
          </table>
        </div>
        <div className="shopping-cart-footer">
          <div className="column">

        </div>
          <div className="column text-lg">Total: <span className="text-medium">${orderInfo.total ? orderInfo.total : "0.00"}</span></div>
          </div>
          <div className="shopping-cart-footer">
          <div className="column">State Of Order is : <b>{orderInfo.status ? orderInfo.status  : "Unknow" }</b></div>
          </div>
      </div>
    </div>
  )
};

export default orderInfo
