import React, { useReducer, Fragment } from 'react';
import axios from 'axios';
import setHeader from '../../middleware/GlobalToken';

import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';

const AuthState = (props) => {
	const initialState = {
		isAuth: false,
		loading: false,
		client: null,
		error: null
	};

	const [ state, dispatch ] = useReducer(AuthReducer, initialState);

	const loadClient = async (token) => {
		if (token) {
			setHeader(token);
			try {
				const res = await axios.get('http://localhost:5000/api/login');
				dispatch({
					type: 'LOGIN_CLIENT',
					payload: res.data
				});
			} catch (error) {
				dispatch({
					type: 'AUTH_FAIL'
					// payload: error.response.data.msg
				});
			}
		}
	};

	// GET TOKEN ON REGISTER

	const registrationToken = async (req) => {
		const config = {
			header: {
				'Content-Type': 'application/json'
			}
		};
		try {
			const res = await axios.post('http://localhost:5000/api/client', req, config);
			dispatch({
				type: 'REG_TOKEN',
				payload: res.data
			});
			loadClient();
		} catch (error) {
			dispatch({
				type: 'REG_FAIL',
				payload: error.response.data.msg
			});
		}
	};

	// GET TOKEN ON LOGIN

	const loginToken = async (req) => {
		const config = {
			header: {
				'Content-Type': 'application/json'
			}
		};
		try {
			const res = await axios.post('http://localhost:5000/api/login', req, config);
			dispatch({
				type: 'LOGIN_TOKEN',
				payload: res.data
			});
		} catch (error) {
			dispatch({
				type: 'LOGIN_FAIL',
				payload: error.response.data.msg
			});
		}
	};

	// CUSTOME ERROR MESSAGES

	const customError = (msg) => {
		dispatch({
			type: 'CUSTOM_ERROR',
			payload: msg
		});

		setTimeout(removeError, 3000);
	};

	const removeError = () => {
		dispatch({
			type: 'REMOVE_ERROR'
		});
	};

	// LOGOUT / CLEAR STATE

	const clearAuthState = () => {
		dispatch({
			type: 'LOGOUT'
		});
	};

	return (
		<Fragment>
			<AuthContext.Provider
				value={{
					isAuth: state.isAuth,
					loading: state.loading,
					client: state.client,
					error: state.error,
					registrationToken,
					loginToken,
					loadClient,
					removeError,
					customError,
					clearAuthState
				}}
			>
				{props.children}
			</AuthContext.Provider>
		</Fragment>
	);
};

export default AuthState;
