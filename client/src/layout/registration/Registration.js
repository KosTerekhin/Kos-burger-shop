import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/AuthContext';
import Spinner from '../../UI/spinner/Spinner';
import BackVideo from '../../assets/Chef.mp4';

const Registration = (props) => {
	const { registrationToken, isAuth, loading, loadClient, error, customError } = useContext(AuthContext);

	const [ client, setClient ] = useState({
		name: '',
		email: '',
		spinnerTime: false,
		password: '',
		password2: ''
	});

	const { name, email, password, password2, spinnerTime } = client;

	const handleChange = (e) => {
		setClient({
			...client,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const req = { name, email, password };

		if (name === '' || email === '') {
			customError('please fill in all fields');
		} else {
			if (password !== password2) {
				customError('passwords do not match');
			} else {
				registrationToken(req);
				setClient({
					name: '',
					email: '',
					spinnerTime: true,
					password: '',
					password2: ''
				});
			}
		}
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
		[ isAuth, spinnerTime, props.history, error, loading ]
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
							type="text"
							name="name"
							value={name}
							placeholder="Username"
							className="form-input"
							onChange={handleChange}
						/>
					</div>

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
							minLength="6"
							name="password"
							value={password}
							placeholder="Password"
							className="form-input"
							onChange={handleChange}
						/>
					</div>
					<div className="form-group">
						<input
							type="password"
							minLength="6"
							name="password2"
							value={password2}
							placeholder="Confirm password"
							className="form-input"
							onChange={handleChange}
						/>
					</div>

					<button className="btn" type="submit">
						Register
					</button>
				</form>
			</div>
		);
	}
};

export default Registration;
