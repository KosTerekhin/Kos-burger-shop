import React, { Fragment, useContext, useEffect } from 'react';

import Burger from './layout/burger/Burger';
import Controls from './layout/controls/Controls';
import Modal from './UI/modal/Modal';
import BurgerContext from './context/burger/BurgerContext';
import AuthContext from './context/auth/AuthContext';
import SumTest from './layout/summary/SumTest';

const Home = () => {
	const { isReOrder, checkoutModalOn, checkoutModalOff } = useContext(BurgerContext);
	const { isAuth, loading } = useContext(AuthContext);

	useEffect(
		() => {

			if (isReOrder) {
				setTimeout(() => {
					checkoutModalOn();
				}, 500);
			} else {
				checkoutModalOff();
			}
		},
		[ isAuth, loading, isReOrder ]
	);

	return (
		<Fragment>
			<Modal>
				<SumTest/>
			</Modal>
			<Burger />
			<Controls />
		</Fragment>
	);
};

export default Home;

