import React from 'react';
import './Style.css';

const orderElements = (data) => {
    const items = data.data.map((el, i) => {
        return <td key={i} >
                    <img src={el.image.thumb} alt="" width="30" height="30" />
                    <hr />
                    <p><b>Name</b> {el.name}</p>
                    <p><b>Price</b>  {el.price}</p>
                    <p><b>Quantity</b>  {el.quantity}</p>
                </td>
    })
    return (
        <table className="table table-bordered m-0"><tbody><tr>{items}</tr></tbody></table>
    )
};

export default orderElements
