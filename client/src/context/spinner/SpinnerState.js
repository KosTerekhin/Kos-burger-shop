import React, { useReducer, Fragment } from 'react';

import SpinnerContext from './SpinnerContext';
import SpinnerReducer from './SpinnerReducer';

const SpinnerState = (props) => {
	const initialState = {
		spinnerTime: true,
		type: null
	};

	const [ state, dispatch ] = useReducer(SpinnerReducer, initialState);

	const spinnerOn = () => {
		dispatch({
			type: 'SPINNER_ON'
		})
	}
	
	const spinnerOff = () => {
		dispatch({
			type: 'SPINNER_OFF'
		})
	}


	return (
		<Fragment>
			<SpinnerContext.Provider
				value={{
					spinnerTime: state.spinnerTime,
					type: state.type,
					spinnerOn,
					spinnerOff
				}}
			>
				{props.children}
			</SpinnerContext.Provider>
		</Fragment>
	);
};

export default SpinnerState;
