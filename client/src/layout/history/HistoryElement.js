import React from 'react';

const HistoryElement = (props) => {
	let element = null;
	let orderItems = null;
	const { meat, cheese } = props.item.ingredients;

	const handleClick = () => {
		props.reOrderRouteHome(props.item);
	};

	orderItems = Object.keys(props.item.ingredients).map((ing, i) => {
		if (props.item.ingredients[ing] === 0) {
			return null;
		} else {
			return (
				<span style={{ textTransform: 'capitalize' }} key={ing + i}>{`${ing}(qty: ${props.item.ingredients[
					ing
				]}) `}</span>
			);
		}
	});

	if (cheese >= 1) {
		switch (meat) {
			case 0:
				element = (
					<div className="order-history">
						<div>
							<p className="order-name-veg">Vegetarian Cheeseburger</p>
							<p>{props.item.date.slice(0, 10)}</p>
							<div className="order-btn" onClick={handleClick}>
								Re-order it!
							</div>
						</div>
						<p>
							<strong>Ingredients:</strong> {orderItems}
						</p>
						<p>
							<strong>Total price:</strong> ${props.item.totalPrice.toFixed(2)}
						</p>
					</div>
				);
				break;
			case 1:
				element = (
					<div className="order-history">
						<div>
							<p className="order-name">Regular Cheeseburger</p>
							<p>{props.item.date.slice(0, 10)}</p>
							<div className="order-btn" onClick={handleClick}>
								Re-order it!
							</div>
						</div>
						<p>
							<strong>Ingredients:</strong> {orderItems}
						</p>
						<p>
							<strong>Total price:</strong> ${props.item.totalPrice.toFixed(2)}
						</p>
					</div>
				);
				break;
			case 2:
				element = (
					<div className="order-history">
						<div>
							<p className="order-name">Double Cheeseburger</p>
							<p>{props.item.date.slice(0, 10)}</p>
							<div className="order-btn" onClick={handleClick}>
								Re-order it!
							</div>
						</div>
						<p>
							<strong>Ingredients:</strong> {orderItems}
						</p>
						<p>
							<strong>Total price:</strong> ${props.item.totalPrice.toFixed(2)}
						</p>
					</div>
				);
				break;

			default:
				if (meat > 5) {
					element = (
						<div className="order-history">
							<div>
								<p className="order-name">JUST A MONSTER Cheeseburger</p>
								<p>{props.item.date.slice(0, 10)}</p>
								<div className="order-btn" onClick={handleClick}>
									Re-order it!
								</div>
							</div>
							<p>
								<strong>Ingredients:</strong> {orderItems}
							</p>
							<p>
								<strong>Total price:</strong> ${props.item.totalPrice.toFixed(2)}
							</p>
						</div>
					);
				} else {
					element = (
						<div className="order-history">
							<div>
								<p className="order-name">{meat} x Cheeseburger</p>
								<p>{props.item.date.slice(0, 10)}</p>
								<div className="order-btn" onClick={handleClick}>
									Re-order it!
								</div>
							</div>
							<p>
								<strong>Ingredients:</strong> {orderItems}
							</p>
							<p>
								<strong>Total price:</strong> ${props.item.totalPrice.toFixed(2)}
							</p>
						</div>
					);
				}
		}
	} else {
		switch (meat) {
			case 0:
				element = (
					<div className="order-history">
						<div>
							<p className="order-name-veg">Vegetarian Hamburger</p>
							<p>{props.item.date.slice(0, 10)}</p>
							<div className="order-btn" onClick={handleClick}>
								Re-order it!
							</div>
						</div>
						<p>
							<strong>Ingredients:</strong> {orderItems}
						</p>
						<p>
							<strong>Total price:</strong> ${props.item.totalPrice.toFixed(2)}
						</p>
					</div>
				);
				break;
			case 1:
				element = (
					<div className="order-history">
						<div>
							<p className="order-name">Regular Hamburger</p>
							<p>{props.item.date.slice(0, 10)}</p>
							<div className="order-btn" onClick={handleClick}>
								Re-order it!
							</div>
						</div>
						<p>
							<strong>Ingredients:</strong> {orderItems}
						</p>
						<p>
							<strong>Total price:</strong> ${props.item.totalPrice.toFixed(2)}
						</p>
					</div>
				);
				break;
			case 2:
				element = (
					<div className="order-history">
						<div>
							<p className="order-name">Double Hamburger</p>
							<p>{props.item.date.slice(0, 10)}</p>
							<div className="order-btn" onClick={handleClick}>
								Re-order it!
							</div>
						</div>
						<p>
							<strong>Ingredients:</strong> {orderItems}
						</p>
						<p>
							<strong>Total price:</strong> ${props.item.totalPrice.toFixed(2)}
						</p>
					</div>
				);
				break;

			default:
				if (meat > 5) {
					element = (
						<div className="order-history">
							<div>
								<p className="order-name">JUST A MONSTER Hamburger</p>
								<p>{props.item.date.slice(0, 10)}</p>
								<div className="order-btn" onClick={handleClick}>
									Re-order it!
								</div>
							</div>
							<p>
								<strong>Ingredients:</strong> {orderItems}
							</p>
							<p>
								<strong>Total price:</strong> ${props.item.totalPrice.toFixed(2)}
							</p>
						</div>
					);
				} else {
					element = (
						<div className="order-history">
							<div>
								<p className="order-name">{meat} x Hamburger</p>
								<p>{props.item.date.slice(0, 10)}</p>
								<div className="order-btn" onClick={handleClick}>
									Re-order it!
								</div>
							</div>
							<p>
								<strong>Ingredients:</strong> {orderItems}
							</p>
							<p>
								<strong>Total price:</strong> ${props.item.totalPrice.toFixed(2)}
							</p>
						</div>
					);
				}
		}
	}

	return element;
};

export default HistoryElement;
