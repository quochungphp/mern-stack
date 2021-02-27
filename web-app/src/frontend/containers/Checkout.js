import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import CheckoutGrid from '../components/Checkout/Checkout';
import Spinner from '../components/UI/Spinner/Spinner'
import { ModalAlertPrimary } from '../components/UI/ModalAlert/ModalAlert'
class Checkout extends Component {

	handleOrder = async () => {
		const data = {
			"fullname": localStorage.name,
			"address": "VietNam",
			"order": this.props.carts,
			"total": this.props.total,
			"status": "created",
			"user_id": localStorage.userId
		}
		this.props.postCreateNewOrder(data)
	}


	render() {
		let checkoutComponent = "";

		checkoutComponent = <CheckoutGrid
			data={{
				"carts": { ...this.props.carts },
				"total": this.props.total,
				"postCreateNewOrder": this.handleOrder,
			}} />



		return (
			<div>
				{checkoutComponent}
				{this.props.loading === true ? <Spinner show={this.props.loading} /> : ""}
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		carts: state.cart.carts,
		total: state.cart.total,
		loading: state.order.loading
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchProduct: () => dispatch(actions.fetchProduct()),
		postCreateNewOrder: (data) => dispatch(actions.postCreateNewOrder(data))

	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
