import React, { useContext, Fragment } from 'react';
import BurgerContext from '../../context/burger/BurgerContext';
import AuthContext from '../../context/auth/AuthContext';
import BurgerElement from './BurgerElement';

const Burger = () => {
	const { ingredients } = useContext(BurgerContext);
	const { client } = useContext(AuthContext);
	const allIngredients = Object.keys(ingredients).map((ingredient) => {
		return [ ...Array(ingredients[ingredient]) ].map((_, index) => {
			return <BurgerElement key={index + ingredient} type={ingredient} />;
		});
	});

	// 2nd method
	// let elements = '';
	// Object.keys(ingredients).map((ingredient) => {
	// 	for (let i = 0; i < ingredients[ingredient]; i++) {
	// 		elements += `,${ingredient}`;
	// 	}
	// });
	// let allIngredients = elements.split(',').splice(1);

	return (
		<Fragment>
			<div className="Burger">
				<BurgerElement type="bread-top" />
				{allIngredients}
				{/* 2nd method */}
				{/* {allIngredients.map((ingredient, index) => <BurgerElement key={index} type={ingredient} />)} */}
				<BurgerElement type="bread-bottom" />
			</div>
		</Fragment>
	);
};

export default Burger;
