import React, { useContext, Fragment } from 'react';
import BurgerContext from '../../context/burger/BurgerContext';
import Total from './Total';
import IngredientSingle from './IngredientSingle';

const Controls = () => {
	const { ingredients, prices, isOrder, checkoutModalOn } = useContext(BurgerContext);

	return (
		<Fragment>
			<div className="Controls">
				<Total />
				{Object.keys(ingredients).map((ing) => {
					return <IngredientSingle key={ing} label={ing} price={prices[ing]} quantity={ingredients[ing]} />;
				})}
				<button className="orderButton" disabled={!isOrder} onClick={checkoutModalOn}>
					ADD TO CART
				</button>
			</div>
		</Fragment>
	);
};

export default Controls;
