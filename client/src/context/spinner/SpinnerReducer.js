export default (state, action) => {
	switch (action.type) {
		case 'SPINNER_ON': {
			return {
				...state,
				spinnerTime: true
			}
		}

		case 'SPINNER_OFF': {
			return {
				...state,
				spinnerTime: false
			}
		}

		default:
			return state;
	}
};
