import React, { useContext } from 'react';
import AuthContext from '../../context/auth/AuthContext';

const Alert = () => {
	const { error, removeError } = useContext(AuthContext);
	let msg = null;

	if (error) {
		msg = (
			<div className={`alert alert-danger`}>
				<i className="fas fa-info-circle" /> {error}
			</div>
		);

		setTimeout(removeError, 3000);
	} else {
		msg = null;
	}

	return msg;
};

export default Alert;
