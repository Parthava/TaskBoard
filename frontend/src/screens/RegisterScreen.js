import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { register } from '../actions/userActions';
import FormContainer from '../components/FormContainer';

const RegisterScreen = ({history, location}) => {

	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [message, setMessage] = useState('')

	const redirect = '/'

	const dispatch = useDispatch()

	const userLogin = useSelector(state => state.userLogin)
	const {loading, error, userInfo} = userLogin

	const userRegister = useSelector(state => state.userRegister)
	const {loading:regLoading, error:regError, userInfo:regUserInfo} = userRegister

	useEffect(() => {
		if(userInfo) {
			history.push(redirect)
		}
	}, [history, userInfo, redirect])

	const submitHandler = (event) => {
		event.preventDefault()
		if(password !== confirmPassword) {
			setMessage('Passwords do not match')
		}
		else {
			dispatch(register(email, username, password))
		}
	}

	return (
		<FormContainer>
			<h1>Register</h1><br/>
			{message && <Message variant='danger'>{message}</Message>}
			{regError && <Message variant='danger'>{regError}</Message>}
			{regLoading && <Loader/>}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='email'>
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type='email'
						required
						placeholder='Enter email'
						value={email}
						onChange={(event) => { setEmail(event.target.value) }}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='username'>
					<Form.Label>Username</Form.Label>
					<Form.Control
						type='text'
						required
						placeholder='Enter username'
						value={username}
						onChange={(event) => { setUsername(event.target.value) }}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						required
						placeholder='Enter password'
						value={password}
						onChange={(event) => { setPassword(event.target.value) }}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='confirmPassword'>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type='password'
						required
						placeholder='Enter confirm password'
						value={confirmPassword}
						onChange={(event) => { setConfirmPassword(event.target.value) }}
					></Form.Control>
				</Form.Group>

				<Button type='submit' varient='primary'>
					Register
				</Button>
			</Form>

			<Row className='py-3'>
				<Col>
					Already registered? {' '} <Link to='/login'>Sign in</Link>
				</Col>
			</Row>
		</FormContainer>
		)
}

export default RegisterScreen