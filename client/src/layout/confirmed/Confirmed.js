import React, { Fragment, useContext } from 'react';
import BurgerContext from '../../context/burger/BurgerContext';
import BurgerGif from '../../assets/burger.gif';

const Confirmed = (props) => {
	const { resetHome } = useContext(BurgerContext);
	const goHome = () => {
		resetHome();
		props.history.push('/');
	};

	const goHistory = () => {
		resetHome();
		props.history.push('/OrderHistory');
	};

	return (
		<Fragment>
			<div className="user">
				<header className="user-header">
					<h1 className="user-title">Order confirmed! It is being prepared now</h1>
				</header>
				<img src={BurgerGif} alt="burger" />
				<form className="index">
					<div className="btn-confirmed" onClick={goHome}>
						New order
					</div>
					<div className="btn-confirmed" onClick={goHistory}>
						Order history
					</div>
				</form>
			</div>
		</Fragment>
	);
};

export default Confirmed;
