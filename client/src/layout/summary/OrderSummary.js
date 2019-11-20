import React, { useContext, Fragment, useEffect } from 'react';
import BurgerContext from '../../context/burger/BurgerContext';
import Button from '../../UI/button/Button';

const OrderSummary = (props) => {
	const { ingredients, 
			checkoutModalOff, 
			totalPrice, 
			submitOrder, 
			isConfirm } = 
		useContext(BurgerContext);
		
	const summary = Object.keys(ingredients).map((ing, index) => {
		if (ingredients[ing] === 0) {
			return null;
		} else {
			return (
				<li key={ing + index}>
					<span style={{ textTransform: 'capitalize' }}>{ing}</span>: {ingredients[ing]}
				</li>
			);
		}
	});

	useEffect(
		() => {
			isConfirm && props.reRoute();
		},
		[ isConfirm, props ]
	);

	return (
		<Fragment>
			<h3>Your Order</h3>
			<p>A delish burger with following ingredients: </p>
			<ul>{summary}</ul>
			<p>
				Total price: <strong>${totalPrice.toFixed(2)} </strong>
			</p>
			<p>Continue to CHECKOUT?</p>
			<Button type={'Success'} clicked={submitOrder}>
				Proceed to payment
			</Button>
			<Button clicked={checkoutModalOff} type={'Danger'}>
				Change burger
			</Button>
		</Fragment>
	);
};

export default OrderSummary;
