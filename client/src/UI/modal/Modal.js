import React, { useContext, Fragment } from 'react';
import BurgerContext from '../../context/burger/BurgerContext';
import Backdrop from '../backdrop/Backdrop';

const Modal = (props) => {
	const { isCheckout } = useContext(BurgerContext);

	return (
		<Fragment>
			<Backdrop />
			<div
				className="Modal"
				style={{
					transform: isCheckout ? 'translateY(0)' : 'translateY(-110vh)',
					opacity: isCheckout ? '1' : '0'
				}}
			>
				{props.children}
			</div>
		</Fragment>
	);
};

export default Modal;
