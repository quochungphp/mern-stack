import React from 'react';
import { Link } from 'react-router-dom';
import './Style.css';
import CheckoutElements  from './CheckoutElements';

const checkoutBody = (props) => {
    let elements = <CheckoutElements {...props}/>
    return (
        <div className="container px-3 my-5 clearfix">
            {/* <!-- Shopping cart table --> */}
            <div className="card">
                <div className="card-header">

                    <h2>Shopping Cart</h2>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                    <table className="table table-bordered m-0">
                        <thead>
                        <tr>
                            {/* <!-- Set columns width --> */}
                            <th className="text-center py-3 px-4" >Product Name &amp; Details</th>
                            <th className="text-right py-3 px-4" >Price</th>
                            <th className="text-center py-3 px-4" >Quantity</th>
                            <th className="text-right py-3 px-4" >Total</th>
                            <th className="text-center align-middle py-3 px-0" ><span className="shop-tooltip float-none text-light"  data-original-title="Clear cart"><i className="ino ion-md-trash"></i></span></th>
                        </tr>
                        </thead>
                        {/* There contains code */}
                        <tbody>
                        {
                            elements
                        }
                        </tbody>
                    </table>
                    </div>
                    {/* <!-- / Shopping cart table --> */}
                    <div className="d-flex flex-wrap justify-content-between align-items-center pb-4">
                        <div className="mt-4">


                        </div>
                        <div className="d-flex flex-wrap justify-content-between align-items-center pb-4">
                            <div className="d-flex">
                                <div className="text-right mt-4">
                                <label className="text-muted font-weight-normal m-0">Total price</label>
                                    <div className="text-large"><strong>${props.data.total}</strong></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="float-right">
                        <Link to="/" className="btn btn-lg btn-default md-btn-flat mt-2 mr-3">Back to shopping</Link>
                        <button type="button" className="btn btn-lg btn-primary mt-2" onClick={(e) => props.data.postCreateNewOrder(e)}>Checkout</button>
                    </div>

                </div>
            </div>
        </div>
    )
};
export default checkoutBody;
