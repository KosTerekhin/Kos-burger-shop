export default (state, action) => {
	switch (action.type) {
		case 'PREV_ORDER':
			return {
				...state,
				ingredients: action.payload
			};

		case 'NO_PREV_ORDER':
			return {
				...state,
				ingredients: action.payload
			};

		case 'LESS_QUANTITY':
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.payload.name]: state.ingredients[action.payload.name] - 1
				}
			};
		case 'MORE_QUANTITY':
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.payload.name]: state.ingredients[action.payload.name] + 1
				}
			};
		case 'NO_ORDER':
			return {
				...state,
				isOrder: false
			};

		case 'YES_ORDER':
			return {
				...state,
				isOrder: true
			};

		case 'UPDATE_TOTAL':
			return {
				...state,
				totalPrice: action.payload
			};

		case 'IS_CHECKOUT':
			return {
				...state,
				isCheckout: true
			};

		case 'FALSE_CHECKOUT':
			return {
				...state,
				isCheckout: false
			};

		case 'ORDER_CONFIRMED':
			return {
				...state,
				isConfirm: true,
				orderConfirmation: action.payload
			};

		case 'GET_ORDER_HISOTRY':
			return {
				...state,
				isConfirm: false,
				orderConfirmation: null,
				orderHistory: action.payload
			};

		case 'RESET_HOME':
			localStorage.removeItem('ingredients');
			return {
				...state,
				ingredients: {
					salad: 0,
					cheese: 0,
					meat: 0,
					bacon: 0
				},
				totalPrice: 0,
				isOrder: false,
				isCheckout: false,
				isConfirm: false,
				isReOrder: false,
				orderConfirmation: null,
				orderHistory: null
			};

		case 'RE_ORDER': {
			return {
				...state,
				ingredients: action.payload,
				isReOrder: true
			};
		}

		case 'OPEN_DRAWER': {
			return {
				...state,
				isDrawer: true
			}
		}

		case 'CLOSE_DRAWER': {
			return {
				...state,
				isDrawer: false
			}
		}



		default:
			return state;
	}
};
