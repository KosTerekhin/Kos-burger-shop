import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../logo/Logo';
import NavItems from '../items/NavItems';
import Menu from '../menuIcon/Menu';
import SideDrawer from '../sideDrawer/SideDrawer';
import Spinner from '../../UI/spinner/Spinner';
import AuthContext from '../../context/auth/AuthContext';

const Toolbar = () => {
	const { isAuth, loading, client } = useContext(AuthContext);
	let isGuest = true;

	if (isAuth && !loading) {
		isGuest = false;
	}

	if (isGuest) {
		return (
			<header className="toolbar">
				<Link to="/Home">
					<Logo height="50px" />
				</Link>
				<div className="navItemsGuest">
					<Link to="/Login" className="singeNavItemGuest">
						Login
					</Link>
					<Link to="/Registration" className="singeNavItemGuest">
						Registration
					</Link>
				</div>
			</header>
		);
	} else {
		return (
			<header className="toolbar">
				<Link to="/Home">
					<Logo height="50px" />
				</Link>
				{!isGuest ? <span>Hello {client.name}</span> : <Spinner />}
				<div className="onlyMobile">
					<Menu />
				</div>
				<div className="desktopOnly">
					<NavItems />
				</div>
				<SideDrawer />
			</header>
		);
	}
};

export default Toolbar;
