import React, { useContext, useEffect } from 'react';
import HistoryElement from './HistoryElement';
import Spinner from '../../UI/spinner/Spinner';

import BurgerContext from '../../context/burger/BurgerContext';
import AuthContext from '../../context/auth/AuthContext';

const OrderHistory = (props) => {
	const { orderHistory, reOrder, fetchOrders } = useContext(BurgerContext);
	const { isAuth, loading, loadClient } = useContext(AuthContext);

	let spinnerTime = true;

	const reOrderRouteHome = (burger) => {
		reOrder(burger);
		props.history.push('/Home');
	};

	useEffect(
		() => {
			const token = localStorage.getItem('token')
			if(!token) {
				props.history.push('/')
			} else {
				loadClient(token)
				fetchOrders();
			}
		},
		[ isAuth, loading ]
	);

	if (orderHistory && isAuth) {
		spinnerTime = false;
	}

	if (!spinnerTime) {
		return (
			<div className="history">
				{orderHistory.map((item) => (
					<HistoryElement key={item._id} item={item} reOrderRouteHome={reOrderRouteHome} />
				))}
			</div>
		);
	} else {
		return <Spinner />;
	}
};

export default OrderHistory;
