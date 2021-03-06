import React, { Component } from 'react';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import _ from 'lodash';

class FormLogin extends Component {
	constructor(props) {
        super(props);
        this.state = {
					username: '',
					password: ''
				};
    }

	handleChange = (event) => {
        const target = event.target;    // input selectbox
        const value  = target.type === 'checkbox' ? target.checked : target.value;
        const name   = target.name;
        this.setState({
            [name]: value
        });
	}

	handleSubmit = (event) => {
		event.preventDefault();
		let {username, password} = this.state;
		this.props.formLogin(username, password);

    }

	render() {

		let errorMessage = "";
			if ( this.props.error ) {
				console.log("mapStateToProps", this.props.error)
			_.forEach(this.props.error, (value) => {

				errorMessage += `<p>
														<b class="text-title">${value.param}: </b>
														<span class="text-danger">${value.msg}</span>
													</p>`
			})
		}
		return (
		    <div className="bg-faded p-4 my-4">
				<hr className="divider" />
				<h2 className="text-center text-lg text-uppercase my-0">Login <strong>Form</strong></h2>
				<hr className="divider" />
				<form onSubmit={this.handleSubmit}>
				    <div className="row">
						{
							errorMessage !== "" ? (
								<div className="form-group col-lg-12" dangerouslySetInnerHTML={{__html: errorMessage}} />
							)
							:
							""
						}

				        <div className="form-group col-lg-6">
				            <label className="text-heading">Username</label>
				            <input name="username" value={this.state.username} onChange={this.handleChange}  type="text" className="form-control" />
										<p><i>Account: user1@test.com / user2@test.com</i></p>
				        </div>
				        <div className="form-group col-lg-6">
				            <label className="text-heading">Password</label>
				            <input name="password" value={this.state.password} onChange={this.handleChange} type="password" className="form-control" />
										<p><i>Password: 123456</i></p>
				        </div>

				        <div className="clearfix" />

				            <div className="form-group col-lg-12">
				                <button type="submit" className="btn btn-secondary">Submit</button>
				            </div>
				        </div>
				</form>
				</div>
		);
	}
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.userToken !== null,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        formLogin: (username, password) => dispatch(actions.actLogin(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormLogin);
