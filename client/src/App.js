import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import BurgerState from './context/burger/BurgerState';
import AuthState from './context/auth/AuthState';

import Home from './Home';
import Registration from './layout/registration/Registration';
import OrderHistory from './layout/history/OrderHistory';
import Login from './layout/login/Login';
import Welcome from './layout/index/Welcome';
import Confirmed from './layout/confirmed/Confirmed';
import Alert from './layout/alert/Alert';
import Toolbar from './Navigation/toolbar/Toolbar';

import PrivateRoute from './middleware/PrivateRoute';

function App() {
	return (
		<Router>
			<AuthState>
				<BurgerState>
					<Toolbar />
					<Switch>
						<PrivateRoute exact path="/Home" component={Home} />
						<PrivateRoute exact path="/Confirmed" component={Confirmed} />
						<Route exact path="/OrderHistory" component={OrderHistory} />
						<Route exact path="/Registration" component={Registration} />
						<Route exact path="/Login" component={Login} />
						<Route path="/" component={Welcome} />
					</Switch>
					<Alert />
				</BurgerState>
			</AuthState>
		</Router>
	);
}

export default App;
