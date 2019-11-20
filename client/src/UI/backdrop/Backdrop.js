import React, { useContext } from 'react';
import BurgerContext from '../../context/burger/BurgerContext';

const Backdrop = () => {
	const { isCheckout, checkoutModalOff } = useContext(BurgerContext);
	const closeModal = () => {
		checkoutModalOff();
	};

	return isCheckout ? <form className="Backdrop" onClick={closeModal} /> : null;
};

export default Backdrop;
