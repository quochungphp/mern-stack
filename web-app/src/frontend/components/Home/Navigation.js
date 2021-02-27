import React, { Component } from 'react';
import { Route, NavLink, Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

const menus = [
	{to: '/'		, exact: true, name: 'Home'},
	{ to: '/order', exact: false, name: 'Order' },
	{to: '/checkout', exact: false, name: 'Checkout'},
	{to: '/login', exact: true, name: 'Login'}
];

const unAuthenticateMenus = [
	{ to: '/', exact: true, name: 'Home' },
	{ to: '/login', exact: true, name: 'Login' }
];


const MenuLink = ({ menu }) => {
	return (
		<Route
			path={menu.to}
			exact={menu.exact}
			children=
				{
					({ match }) => {
						let active = (match !== null) ? "active" : "";
						return (
							<li className={`nav-item px-lg-4 ${active}`} >
								<Link to={menu.to} className="nav-link text-uppercase text-expanded">
									{menu.name}
								</Link>
							</li>
						)
					}
				}
		/>
	)
}

class Navigation extends Component {
	render() {
		return (
  			<nav className="navbar navbar-expand-lg navbar-light bg-faded py-lg-4">
			    <div className="container">
			    	<NavLink to='/' className="navbar-brand text-uppercase text-expanded font-weight-bold d-lg-none">
						Menu
					</NavLink>

			        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
			        <span className="navbar-toggler-icon" />
			        </button>
			        <div className="collapse navbar-collapse" id="navbarResponsive">
			            <ul className="navbar-nav mx-auto">
										{this.showMenusTwo(menus, unAuthenticateMenus)}
			            </ul>
			        </div>
			    </div>
			</nav>
		);
	}

	showMenusTwo(menus, unAuthenticateMenus){
		let xhtml = null;
		if (!this.props.isAuthenticated) {
			xhtml = unAuthenticateMenus.map((menu, index) => {
				return (
					<MenuLink menu={menu} key={index} />
				);
			});
			return xhtml;
		}

		if(menus.length > 0 ){
			xhtml = menus.map((menu, index)=> {
				return (
					<MenuLink menu={menu} key={index} />
				);
			});
		}
		return xhtml;
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.userToken !== null
	};
};


export default withRouter(connect(mapStateToProps)(Navigation));
