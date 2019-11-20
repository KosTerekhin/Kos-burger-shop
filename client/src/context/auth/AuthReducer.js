export default (state, action) => {
	switch (action.type) {
		case 'LOGIN_TOKEN':
		case 'REG_TOKEN': {
			localStorage.setItem('token', action.payload);
			return {
				...state,
				isAuth: true,
				loading: true
			};
		}

		case 'LOGIN_CLIENT': {
			return {
				...state,
				client: action.payload,
				isAuth: true,
				loading: false
			};
		}

		case 'AUTH_FAIL':
		case 'LOGIN_FAIL':
		case 'REG_FAIL': {
			localStorage.removeItem('token');
			return {
				...state,
				error: action.payload,
				loading: false
			};
		}

		case 'CUSTOM_ERROR': {
			return {
				...state,
				error: action.payload
			};
		}

		case 'REMOVE_ERROR': {
			return {
				...state,
				error: null
			};
		}

		case 'LOGOUT': {
			localStorage.removeItem('token');
			return {
				isAuth: false,
				loading: false,
				client: null,
				error: null
			};
		}
		default:
			return state;
	}
};
