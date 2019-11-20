import React, { Fragment } from 'react';

const checkout = () => {
	return (
		<Fragment>
			<div className="container">
				<div className="window">
					<div className="credit-info">
						<div className="credit-info-content">
							<form className="half-input-table">
								<div>
									<div>Please select your card: </div>
									<div>
										<div className="dropdown" id="card-dropdown">
											<div className="dropdown-btn" id="current-card">
												Visa
											</div>
											<div className="dropdown-select">
												<ul>
													<li>Master Card</li>
													<li>American Express</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</form>
							<img
								src="https://dl.dropboxusercontent.com/s/ubamyu6mzov5c80/visa_logo%20%281%29.png"
								height="80"
								className="credit-card-image"
								id="credit-card-image"
							/>
							Card Number
							<input className="input-field" />
							Card Holder
							<input className="input-field" />
							<form className="half-input-table">
								<div>
									<div>
										{' '}
										Expires
										<input className="input-field" />
									</div>
									<div>
										CVC
										<input className="input-field" />
									</div>
								</div>
							</form>
							<button className="pay-btn">Checkout</button>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default checkout;
