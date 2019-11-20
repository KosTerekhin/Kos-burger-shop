import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';
 
const PrivateCheckoutRoute = ({ component: Component, ...rest }) => {
	const { isAuth } = useContext(AuthContext);
	return (
		<Route
			{...rest}
			render={(props) => 
			(!isAuth ? <Redirect to="/" />
			 : 
			 <Component {...props} />)}
		/>
	);
};

export default PrivateCheckoutRoute;
