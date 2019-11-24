import React, { useReducer, Fragment, useEffect } from 'react';

import BurgerContext from './BurgerContext';
import BurgerReducer from './BurgerReducer';
import Axios from 'axios';

const BurgerState = (props) => {
	const prevOrder = localStorage.getItem('ingredients');
	const initialState = {
		ingredients: prevOrder
			? JSON.parse(prevOrder)
			: {
					salad: 0,
					bacon: 0,
					cheese: 0,
					meat: 0
				},
		prices: {
			salad: 2.5,
			cheese: 5,
			meat: 20,
			bacon: 7.5
		},
		totalPrice: 0,
		isOrder: false,
		isCheckout: false,
		isConfirm: false,
		isReOrder: false,
		isDrawer: false,
		orderConfirmation: null,
		orderHistory: null
	};

	const [ state, dispatch ] = useReducer(BurgerReducer, initialState);

	const lessQuantity = (name, quantity) => {
		dispatch({
			type: 'LESS_QUANTITY',
			payload: { name, quantity }
		});
	};

	const moreQuantity = (name, quantity) => {
		dispatch({
			type: 'MORE_QUANTITY',
			payload: { name, quantity }
		});
	};

	const updateTotal = (total) => {
		dispatch({
			type: 'UPDATE_TOTAL',
			payload: total
		});
	};

	const checkoutModalOn = () => {
		dispatch({
			type: 'IS_CHECKOUT'
		});
	};

	const checkoutModalOff = () => {
		dispatch({
			type: 'FALSE_CHECKOUT'
		});
	};

	const submitOrder = async (total) => {
		const order = {
			ingredients: state.ingredients,
			prices: state.prices,
			totalPrice: total
		};

		const config = {
			header: {
				'Content-Type': 'application/json'
			}
		};

		try {
			const res = await Axios.post('https://immense-earth-50268.herokuapp.com/api/orders', order, config);
			dispatch({
				type: 'ORDER_CONFIRMED',
				payload: res.data
			});
		} catch (error) {
			throw error;
		}
	};

	const fetchOrders = async () => {
		try {
			const res = await Axios.get('https://immense-earth-50268.herokuapp.com/api/orders');
			res &&
				dispatch({
					type: 'GET_ORDER_HISOTRY',
					payload: res.data
				});
		} catch (error) {
			throw error;
		}
	};

	// HOME PAGE RE-ROUTING

	const resetHome = () => {
		dispatch({
			type: 'RESET_HOME'
		});
	};

	const reOrder = (burger) => {
		dispatch({
			type: 'RE_ORDER',
			payload: burger.ingredients
		});
	};

	// SIDE DRAWER HANDLING

	const openDrawer = () => {
		dispatch({
			type: 'OPEN_DRAWER'
		});
	};

	const closeDrawer = () => {
		dispatch({
			type: 'CLOSE_DRAWER'
		});
	};

	useEffect(
		() => {
			// set ORDER
			let totalQuantity = Object.keys(state.ingredients).reduce((sum, curr) => {
				return (sum += state.ingredients[curr]);
			}, 0);
			if (totalQuantity === 0) {
				dispatch({
					type: 'NO_ORDER'
				});
				localStorage.removeItem('ingredients');
			} else {
				dispatch({
					type: 'YES_ORDER'
				});
				localStorage.setItem('ingredients', JSON.stringify(state.ingredients));
			}
		},
		[ state.ingredients ]
	);

	return (
		<Fragment>
			<BurgerContext.Provider
				value={{
					ingredients: state.ingredients,
					prices: state.prices,
					isOrder: state.isOrder,
					isCheckout: state.isCheckout,
					isConfirm: state.isConfirm,
					isReOrder: state.isReOrder,
					isDrawer: state.isDrawer,
					totalPrice: state.totalPrice,
					orderHistory: state.orderHistory,
					orderConfirmation: state.orderConfirmation,
					lessQuantity,
					moreQuantity,
					updateTotal,
					checkoutModalOff,
					checkoutModalOn,
					submitOrder,
					fetchOrders,
					resetHome,
					reOrder,
					openDrawer,
					closeDrawer
				}}
			>
				{props.children}
			</BurgerContext.Provider>
		</Fragment>
	);
};

export default BurgerState;
