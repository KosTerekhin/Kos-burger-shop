import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import Spinner from '../../UI/spinner/Spinner';
import BackVideo from '../../assets/slowMoMeat.webm';
import loader from '../../assets/inLineLoader.gif'

const Welcome = (props) => {
	const { loadClient, loading, isAuth } = useContext(AuthContext);

	useEffect(
		() => {
			const token = localStorage.getItem('token');
			if (token) {
				loadClient(token);
			}

			if (isAuth && !loading) {
				props.history.push('/Home');
			}
		},
		[ isAuth, loading, props.history ]
	);

	let spinnerTime = false;
	const token = localStorage.getItem('token');
	if (token) {
		spinnerTime = true;
	}

	if (spinnerTime) {
		return <Spinner />;
	} else {
		return (
			<Fragment>
				<div className="user">
					<div className="fullscreen-video">
						<video className="video" loop autoPlay>
							<source src={BackVideo} type="video/mp4" />
							<source src={BackVideo} type="video/ogg" />
						</video>
					</div>
					<div className="user-overlay" />
					<header className="user-header">
						<h1 className="user-title">Lets start buiding your burger!</h1>
					</header>

					<form className="index">
						<Link to="/Login" className="btn-confirmed" type="submit">
							Login
						</Link>
						<Link to="/Registration" className="btn-confirmed" type="submit">
							Register
						</Link>
					</form>
				</div>
			</Fragment>
		);
	}
};

export default Welcome;
