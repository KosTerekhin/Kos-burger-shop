import React, { Fragment, useContext, useState, useEffect } from 'react';
import BurgerContext from '../../context/burger/BurgerContext';
import { withRouter } from 'react-router-dom';
import { StripeProvider, Elements } from 'react-stripe-elements';
import StripeScriptLoader from 'react-stripe-script-loader';

import Sum from './Sum';
import AuthContext from '../../context/auth/AuthContext';

const SumTest = (props) => {
	const [ modal, setModal ] = useState({
		isFood: true,
		isDelivery: false,
		isCard: false
	});

	const { isFood, isDelivery, isCard } = modal;
	const { client }= useContext(AuthContext);
	const { ingredients, 
			checkoutModalOff, 
			totalPrice, 
			submitOrder, 
			isCheckout, 
			prices } = useContext(BurgerContext);

	const [ delivery, setDelivery ] = useState({
		shippingCost: 0,
		orderTotal: 0
	});

	const { shippingCost, orderTotal } = delivery;

	const summary = Object.keys(ingredients).map((ing, index) => {
		if (ingredients[ing] === 0) {
			return null;
		} else {
			return (
				<tr key={ing + index}>
					<td>{ingredients[ing]}</td>
					<td>{ing}</td>
					<td className="right-align">${prices[ing].toFixed(2)}</td>
				</tr>
			);
		}
	});

	const handleClose = (e) => {
		e.preventDefault();
		checkoutModalOff();
		setModal({
			isFood: true,
			isDelivery: false,
			isCard: false
		});
	};

	const toDelivery = (e) => {
		e.preventDefault();
		setModal({
			isFood: false,
			isDelivery: true,
			isCard: false
		});
		setDelivery({
			...delivery,
			orderTotal: totalPrice + shippingCost
		});
	};

	const toCard = (e) => {
		e.preventDefault();
		setModal({
			isFood: false,
			isDelivery: false,
			isCard: true
		});
	};

	const handleClick = (e) => {
		setDelivery({
			shippingCost: parseFloat(e.target.value),
			orderTotal: totalPrice + parseFloat(e.target.value)
		});
	};

	const checkout = () => {
		submitOrder(orderTotal);
		setTimeout(()=> {

			props.history.push('/Confirmed');
			setModal({
				isFood: true,
				isDelivery: false,
				isCard: false
			});

		}, 1000)
	};

	useEffect(
		() => {
			!isCheckout &&
				setModal({
					isFood: true,
					isDelivery: false,
					isCard: false
				});
		},
		[ isCheckout ]
	);

	return (
		<Fragment>
			{/* 1ST PAGE */}
			<div className={isFood ? 'modal-container' : 'invisible'}>
				<h4 className="modal-name">Please review your order</h4>
				<div className="summary-wrapper">
					<table className="modal-summary">
						<thead>
							<tr>
								<th>QTY</th>
								<th>ITEM</th>
								<th className="right-align">PRICE</th>
							</tr>
						</thead>
						<tbody>
							{summary}
							<tr>
								<td />
								<td className="right-align-bold">Burger cost</td>
								<td className="right-align-bold">${totalPrice.toFixed(2)}</td>
							</tr>
						</tbody>
					</table>

					<form className="btn-form">
						<button className="btn-modal" onClick={handleClose}>
							<span>Change ingredients</span>
						</button>
						<button className="btn-modal" onClick={toDelivery}>
							<span>Select delivery</span>
						</button>
					</form>
				</div>
			</div>
			{/* 2ND PAGE -> add modal container */}
			<div className={isDelivery ? 'modal-container' : 'invisible'}>
				<h4 className="modal-name">Pick delivery method</h4>
				<div className="summary-wrapper">
					<table className="modal-summary">
						<thead>
							<tr>
								<th>TYPE</th>
								<th>TIME</th>
								<th className="right-align">COST</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="radio">
									<div className="radio">
										<label>
											<input
												type="radio"
												id="regular"
												value="0"
												name="optradio"
												defaultChecked
												onChange={handleClick}
											/>
											<i className="fas fa-bicycle" />
										</label>
									</div>
								</td>

								<td>45min-1h</td>
								<td className="right-align">FREE</td>
							</tr>
							<tr>
								<td className="radio">
									<div className="radio">
										<label>
											<input
												type="radio"
												id="car"
												value="50"
												name="optradio"
												onChange={handleClick}
											/>
											<i className="fas fa-car" />
										</label>
									</div>
								</td>

								<td>30min</td>
								<td className="right-align">$50.00</td>
							</tr>
							<tr>
								<td className="radio">
									<div className="radio">
										<label>
											<input
												type="radio"
												id="helicopter"
												value="500"
												name="optradio"
												onChange={handleClick}
											/>
											<i className="fas fa-helicopter" />
										</label>
									</div>
								</td>

								<td>5min</td>
								<td className="right-align">$500.00</td>
							</tr>
							<tr>
								<td />
								<td className="right-align">Burger cost</td>
								<td className="right-align">${totalPrice.toFixed(2)}</td>
							</tr>
							<tr>
								<td />
								<td className="right-align">Shipping cost</td>
								<td className="right-align">${shippingCost.toFixed(2)}</td>
							</tr>
							<tr>
								<td />
								<td className="right-align-bold">Total</td>
								<td className="right-align-bold">${orderTotal.toFixed(2)}</td>
							</tr>
						</tbody>
					</table>

					<form className="btn-form">
						<button className="btn-modal" onClick={handleClose}>
							<span>Change ingredients</span>
						</button>
						<button className="btn-modal" onClick={toCard}>
							<span>To payment</span>
						</button>
					</form>
				</div>
			</div>

			{/* 3rd PAGE */}
			<div className={isCard ? 'modal-container' : 'invisible'}>
							<Sum checkout={checkout} 
								handleClose={handleClose}
								orderTotal={orderTotal} 
								client={client}/>
			</div>
		</Fragment>
	);
};

export default withRouter(SumTest);
