import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';

const Logo = (props) => {
	return (
		<div className="logo" style={{ height: props.height }}>
			<img src={burgerLogo} alt="Logo" />
		</div>
	);
};

export default Logo;
