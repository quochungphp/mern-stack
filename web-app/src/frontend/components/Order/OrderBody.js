import React from 'react';
import { Link } from 'react-router-dom';
import './Style.css';
import OrderElements  from './OrderElements';

const checkoutBody = (props) => {
    let elements = <OrderElements {...props}/>
    return (
        <div className="container px-3 my-5 clearfix">
            {/* <!-- Shopping cart table --> */}
            <div className="card">
                <div className="card-header">

                    <h2>Order Management</h2>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                    <table className="table table-bordered m-0">
                        <thead>
                        <tr>
                            {/* <!-- Set columns width --> */}
                            <th className="text-center py-3 px-4" >Buyer</th>
                            <th className="text-right py-3 px-4 text-center" >Status</th>
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

                    </div>
                    <div className="float-right">
                        <Link to="/" className="btn btn-lg btn-default md-btn-flat mt-2 mr-3">Back to shopping</Link>
                    </div>

                </div>
            </div>
        </div>
    )
};
export default checkoutBody;
