import React from 'react';

const Button = (props) => {
	return (
		<button onClick={props.clicked} className={['Buttonz', props.type].join(' ')}>
			{props.children}
		</button>
	);
};

export default Button;
