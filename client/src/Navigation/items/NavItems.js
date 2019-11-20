import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import BurgerContext from '../../context/burger/BurgerContext';
import AuthContext from '../../context/auth/AuthContext';

const NavItems = () => {
	const { resetHome, closeDrawer } = useContext(BurgerContext);
	const { clearAuthState } = useContext(AuthContext);

	const logout = () => {
		closeDrawer();
		resetHome();
		clearAuthState();
	};

	const handleClick = () => {
		closeDrawer();
	};

	return (
		<div className="navItems">
			<Link to="/" onClick={handleClick} className="singeNavItem">
				Checkout
			</Link>
			<Link to="/OrderHistory" onClick={handleClick} className="singeNavItem">
				Order history
			</Link>
			<Link to="/" onClick={logout} className="singeNavItem">
				Logout
			</Link>
		</div>
	);
};

export default NavItems;
