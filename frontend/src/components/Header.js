import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { logout } from '../actions/userActions';
import axios from 'axios'

function Header() {

	const [imageUrl, setImageUrl] = useState('')

	const dispatch = useDispatch()

	const userLogin = useSelector(state => state.userLogin)
	const { userInfo } = userLogin

	useEffect(() => {
		profilePic();
	},[])

	const profilePic = async () => {
			const num = Math.floor((Math.random() * 100) + 1);
			const url = `https://picsum.photos/id/${num}/info` 
			const response = await fetch(url);
  			const jsonData = await response.json();
  			console.log(jsonData.download_url)
  			setImageUrl(jsonData.download_url)
  			console.log(imageUrl)
		}

	const logoutHandler = () => {
		dispatch(logout())
	}

  return (
    <header>
      	<Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
      		<Container>
			  
      		<LinkContainer to='/'>
			  <Navbar.Brand>TaskBoard</Navbar.Brand>
			 </LinkContainer>

			  <Navbar.Toggle aria-controls="basic-navbar-nav" />
			  <Navbar.Collapse id="basic-navbar-nav">
			    <Nav className="ml-auto">
			    
			    	{userInfo ? (
			    	<><img src={imageUrl} className="avatar"/>
			    	<NavDropdown title={userInfo.username} id='username'>
						<NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
			    	</NavDropdown></>
			    	) 

			    : <LinkContainer to='/login'>
			      <Nav.Link href="/login">
			      	<i className='fas fa-user'> Sign in </i>
			      </Nav.Link>
			     </LinkContainer>}


			    </Nav>
			  </Navbar.Collapse>
			</Container>
		</Navbar>
    </header>
  );
}

export default Header;
