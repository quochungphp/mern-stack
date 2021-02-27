import React from 'react';
import './Style.css';

const checkoutElements = (props) => {
    console.log("checkoutElements", props);

    const data = [];
    const rawData = props.data.carts;
    for (let p in rawData) {
        console.log(rawData[p])
        data.push({
            ...rawData[p]
        });
    }
    const items = data.map((el, i) => {
        return <tr key={i}>
                <td className="p-4">
                <div className="media align-items-center">
                    <img src={el.image.thumb} className="d-block ui-w-40 ui-bordered mr-4" alt="" />
                    <div className="media-body">
                        <span className="d-block text-dark">{el.name}</span>
                    </div>
                </div>
                </td>
                <td className="text-right font-weight-semibold align-middle p-4">${el.price}</td>
                <td className="align-middle p-4"><input type="text" className="form-control text-center" readOnly defaultValue={el.quantity} /></td>
                <td className="text-right font-weight-semibold align-middle p-4">${el.price*el.quantity}</td>
                <td className="text-center align-middle px-0"><span className="shop-tooltip close float-none text-danger" data-original-title="Remove">×</span></td>
            </tr>
    })
    return (
        data.length > 0 ? items : <tr ><td colSpan="4"><p class='text-center' >Empty data </p></td></tr>
    )
};

export default checkoutElements
