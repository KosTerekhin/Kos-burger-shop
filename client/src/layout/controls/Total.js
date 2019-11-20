import React, { useContext, Fragment, useEffect } from 'react';
import BurgerContext from '../../context/burger/BurgerContext';

const Total = () => {
	const { ingredients, prices, updateTotal, totalPrice } = useContext(BurgerContext);

	useEffect(
		() => {
			let Total;
			Object.keys(ingredients).reduce((sum, current) => {
				return (Total = sum + ingredients[current] * prices[current]);
			}, 0);

			updateTotal(Total);
			// eslint-disable-next-line 
		},
		[ ingredients, prices ]
	);

	return (
		<Fragment>
			<div className="total">
				<p>
					Current price: <strong>${totalPrice.toFixed(2)}</strong>
				</p>
			</div>
		</Fragment>
	);
};

export default Total;
