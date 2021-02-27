import React from 'react';
import './Style.css';
import OrderChildElements from "./OrderChildElement";
const orderElements = (props) => {
    const data = [];
    const rawData = props.data.orders;
    for (let p in rawData) {
        console.log(rawData[p])
        data.push({
            ...rawData[p]
        });
    }
    console.log("orderElements", props);

    const items = data.map((el, i) => {
        return <tr key={i}>
                <td className="p-4">
                    <div className="media align-items-center">
                        <div className="media-body">
                            <p className="d-block text-dark"><b>Name:</b> {el.fullname}</p>
                            <p className="d-block text-dark"><b>Address:</b> {el.address}</p>
                            <p className="d-block text-dark"><b>Created date:</b> {el.created}</p>
                            <p className="d-block text-dark"><b>Total price: </b> ${el.total}</p>
                        </div>
                    </div>
                {
                    <OrderChildElements data={el.order} />
                }
                </td>
                <td className="text-center align-middle">
                    <button type="button"
                        className={el.status + ' align-middle status-order btn btn-lg btn-primary mt-2'} >{el.status}
                    </button>
                    <hr />
                    <button type="button"
                        className={' align-middle status-order btn btn-lg btn-success mt-2'}
                        onClick={(e) => props.data.onFetchOrderSingleInfo(e, el._id)}>Click to view info
                    </button>
                    {
                        el.status === "confirmed" || el.status === "created" ?
                        <div>
                            <hr />
                            <button type="button"
                                className={' align-middle status-order btn btn-lg btn-danger mt-2'}
                                onClick={(e) => props.data.updateStatusOrder({"id": el._id, "status" : "cancelled"})}>Click to cancel order
                            </button>
                        </div>
                        : ""
                    }
                </td>
            </tr>
    })
    return (
        items
    )
};

export default orderElements
