import React, { useState, Fragment } from 'react';
import loader from '../../assets/inLineLoader.gif';

const Sum = (props) => {
	const { orderTotal, checkout } = props;
	const [ load, setLoad ] = useState({
		isLoading: false,
		isSuccess: false
	});

	const { isLoading } = load;
	const makePayment = async (e) => {
		e.preventDefault();
		try {
			setLoad({
				isLoading: true
			});

			setTimeout(() => {
				setLoad({
					isLoading: false,
					isSuccess: true
				});
				checkout()
			}, 1500)

		} catch (error) {
			throw error;
		}
	};

	return (
		<Fragment>
			<h4 className="modal-name">Enter card details</h4>
			<div className="credit-card">
				<img src="https://seeklogo.com/images/V/VISA-logo-62D5B26FE1-seeklogo.com.png" className="logo-card" />
				<label>Card number:</label>
				<input className="card-number" 
				type="text"
				placeholder="1234 5678 9101 1121"
				 />
				<div className="bottom-card-row">
					<div>
						<label>Name:</label>
						<input className="name-cardholder" placeholder="Edgar Pérez" name="name" />
					</div>
					<div>
						<label>CCV:</label>
						<input className="ccv" placeholder="321" />
					</div>
				</div>
			</div>
			<h3>Total cost: ${orderTotal.toFixed(2)}</h3>
			<form className="btn-form">
				<button className="btn-modal" >
					<span>Change ingredients</span>
				</button>
				<button className="btn-modal" onClick={makePayment}>
					<span className="stripe-confirm">
						Confirm <img src={loader} alt="loader" className={!isLoading ? 'invisible' : 'visible'} />
					</span>
				</button>
			</form>
		</Fragment>
	);
};

export default Sum;
