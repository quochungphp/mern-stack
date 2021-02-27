import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import ProductGrid from '../components/Product/Product';
import { ModalAlert, ModalAlertAddToCart} from '../components/UI/ModalAlert/ModalAlert'

class HomePage extends Component {
	constructor() {
		super();
		this.state = {
			isOpen: false,
			isAddToCart: false
		};
	}
	componentDidMount() {
		this.props.onFetchProduct()

	}
	handleAddToCart = (itemCart) => {
		if (!this.props.isAuthenticated) {
			this.setState({ isOpen: true });
		} else {
			this.setState({ isOpen: false, isAddToCart : true});
			this.props.addToCart(itemCart);
		}
	}

	handleCloseModal = (e) => {
		this.setState({ isOpen: false });
	}

	handleCloseAddToCartModal = (e) => {
		this.setState({ isAddToCart: false });
	}
	render() {
		let products = "", modalAlert = "", modalAddToCartAlert = "";
		if (this.state.isOpen) {
			modalAlert = <ModalAlert closeModal={this.handleCloseModal} />
		}
		if (this.state.isAddToCart) {
			modalAddToCartAlert = <ModalAlertAddToCart closeModal={this.handleCloseAddToCartModal} />
		}
		if (!this.props.loading) {
			products = <ProductGrid props={{ "products": this.props.products, "addToCartHandle": this.handleAddToCart}} />
		}
		return (
  			<div>
				{products}
				{modalAlert}
				{modalAddToCartAlert}
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.userToken !== null,
		carts: state.cart.carts,
		products: state.product.products,
		loading: state.product.loading,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchProduct: () => dispatch(actions.fetchProduct()),
		addToCart: (itemCart) => dispatch(actions.addToCart(itemCart))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
