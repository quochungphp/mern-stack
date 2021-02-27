import React from 'react';

import './Style.css';

const products = (props) => {
    const productData = [];
    const drawData = props.props.products;
    for (let p in drawData) {
        productData.push({
            ...drawData[p]
        });
    }
    const productItems = productData.map((el, i) => {
        return <div key={i} className="col-md-6">
                <section className="panel">
                    <div className="pro-img-box">
                        <picture>
                            <img src={el.image.large} alt="" className="img-thumbnail product-image" />
                        </picture>

                    </div>
                    <div className="panel-body text-center">
                    <h3 className="pro-title">
                        <br />
                            {el.name}
                        </h3>
                        <p className="price">${el.price}</p>
                    </div>
                    <button className="adtocart" onClick={() => { props.props.addToCartHandle(el) }} >
                        <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    </button>
                </section>
            </div>;
    });
  return (
    <div className="container product-layout">
      <div className="col-md-12">
          <div className="row product-list">
                {productItems}
          </div>
      </div>
  </div>
  )
};

export default products;
