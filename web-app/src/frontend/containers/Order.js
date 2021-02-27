import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import OrderComponent from '../components/Order/Order';
import OrderInfo from '../components/Order/OrderInfo/OrderInfo';

import {ModalViewInfo} from '../components/UI/ModalAlert/ModalAlert'
class Order extends Component {
	constructor() {
		super();
		this.state = {
			isOpen: false
		};
	}
	componentDidMount() {
		this.props.onFetchProduct()
	}


	handleCloseModal = (e) => {
		this.setState({ isOpen: false });
	}

	onFetchOrderSingleInfo = (e, id) => {
		this.setState({ isOpen: true });
		this.props.onFetchOrderSingleInfo(id)
	}
	render() {
		let orderComponent = "";
		let orderInfoComponnet = "";

		if (!this.props.loading) {
			orderComponent = <OrderComponent data={{
				"orders": this.props.orders,
				"updateStatusOrder": this.props.updateStatusOrder,
				"onFetchOrderSingleInfo": this.onFetchOrderSingleInfo
			}} />
		}
		if (Object.keys(this.props.orderInfo).length && this.state.isOpen) {

			orderInfoComponnet = <ModalViewInfo
				closeModal={this.handleCloseModal}
				orderInfo={<OrderInfo orderInfo={this.props.orderInfo}/>}
			/>
		}

		return (
  			<div>
				{orderComponent}
				{orderInfoComponnet}
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		orders: state.order.orders,
		orderInfo: state.order.orderInfo,
		loading: state.order.loading,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchProduct: () => dispatch(actions.fetchOrderList()),
		onFetchOrderSingleInfo: (id) => dispatch(actions.fetchOrderSingleInfo(id)),
		updateStatusOrder: (data) => dispatch(actions.updateStatusOrder(data))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
