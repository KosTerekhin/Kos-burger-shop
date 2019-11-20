import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../logo/Logo';
import NavItems from '../items/NavItems';
import BurgerContext from '../../context/burger/BurgerContext';

const SideDrawer = () => {
	const { isDrawer, closeDrawer } = useContext(BurgerContext);

	const handleClose = () => {
		closeDrawer();
	};

	return (
		<div className="onlyMobile">
			<div
				className={
					isDrawer ? (
						[ 'sideDrawer', 'openSideDrawer' ].join(' ')
					) : (
						[ 'sideDrawer', 'closeSideDrawer' ].join(' ')
					)
				}
			>
				<Link to="/Home" onClick={handleClose}>
					<Logo height="100px" />
				</Link>
				<NavItems />
				<a href="#" className="closeSideDrawerIcon" onClick={handleClose} />
			</div>
		</div>
	);
};

export default SideDrawer;
