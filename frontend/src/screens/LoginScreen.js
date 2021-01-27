import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';

const LoginScreen = ({history, location}) => {

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const redirect = '/'

	const dispatch = useDispatch()

	const userLogin = useSelector(state => state.userLogin)
	const {loading, error, userInfo} = userLogin

	useEffect(() => {
		if(userInfo) {
			history.push(redirect)
		}
	}, [history, userInfo, redirect])

	const submitHandler = (event) => {
		event.preventDefault()
		dispatch(login(email, password))
	}

	return (
		<FormContainer>
			<h1>Sign in</h1><br/>
			{error && <Message variant='danger'>{error}</Message>}
			{loading && <Loader/>}
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

				<Button type='submit' varient='primary'>
					Sign In
				</Button>
			</Form>

			<Row className='py-3'>
				<Col>
					New User? {' '} <Link to='/register'>Register</Link>
				</Col>
			</Row>
		</FormContainer>
		)
}

export default LoginScreen