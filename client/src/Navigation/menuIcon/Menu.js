import React, { useContext } from 'react';
import BurgerContext from '../../context/burger/BurgerContext';

const Menu = () => {
	const { openDrawer } = useContext(BurgerContext);

	return (
		<div
			className="box-menu"
			onClick={() => {
				openDrawer();
			}}
		/>
	);
};

export default Menu;
