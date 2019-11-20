import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/AuthContext';
import Spinner from '../../UI/spinner/Spinner';
import BackVideo from '../../assets/Chef.mp4';

const Login = (props) => {
	const { isAuth, loading, loginToken, loadClient, error } = useContext(AuthContext);

	const [ client, setClient ] = useState({
		email: '',
		password: '',
		spinnerTime: false
	});

	const { email, password, spinnerTime } = client;

	const handleChange = (e) => {
		setClient({
			...client,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const req = { email, password };
		loginToken(req);
		setClient({
			email: '',
			password: '',
			spinnerTime: true
		});
	};

	useEffect(
		() => {
			const token = localStorage.getItem('token');
			if (token) {
				setClient({
					...client,
					spinnerTime: true
				});
				loadClient(token);
			}

			if (isAuth && !loading) {
				props.history.push('/Home');
			}

			if (error) {
				setClient({
					...client,
					spinnerTime: false
				});
			}
		},
		[ isAuth, loading, props.history, error ]
	);

	if (spinnerTime) {
		return <Spinner />;
	} else {
		return (
			<div className="user">
				<div className="fullscreen-video">
					<video className="video" loop autoPlay>
						<source src={BackVideo} type="video/mp4" />
						<source src={BackVideo} type="video/ogg" />
					</video>
				</div>
				<div className="user-overlay" />
				<form className="form" onSubmit={handleSubmit}>
					<div className="form-group">
						<input
							type="email"
							name="email"
							value={email}
							placeholder="Email"
							className="form-input"
							onChange={handleChange}
						/>
					</div>

					<div className="form-group">
						<input
							type="password"
							name="password"
							value={password}
							placeholder="Password"
							className="form-input"
							onChange={handleChange}
						/>
					</div>

					<button className="btn" type="submit">
						Login
					</button>
				</form>
			</div>
		);
	}
};

export default Login;
