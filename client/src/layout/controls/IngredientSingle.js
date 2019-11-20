import React, { useContext } from 'react';
import BurgerContext from '../../context/burger/BurgerContext';

const IngredientSingle = (props) => {
	const { lessQuantity, moreQuantity } = useContext(BurgerContext);

	const Less = (e) => {
		if (props.quantity === 0) {
			console.log('already 0');
			// ---SET ALERT ----

			return;
		}

		lessQuantity(e.target.name, e.target.value);
	};

	const More = (e) => {
		moreQuantity(e.target.name, e.target.value);
	};

	return (
		<div className="IngredientSingle">
			<div className="Label">{props.label}</div>
			<div className="Label">${props.price.toFixed(2)}</div>
			{props.quantity === 0 ? (
				<button className="custom-btn-less" disabled>
					Less
				</button>
			) : (
				<button className="custom-btn-less" name={props.label} value={props.quantity} onClick={Less}>
					Less
				</button>
			)}

			<button className="custom-btn-more" name={props.label} value={props.quantity} onClick={More}>
				More
			</button>
		</div>
	);
};

export default IngredientSingle;
