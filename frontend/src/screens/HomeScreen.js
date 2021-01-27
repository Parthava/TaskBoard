import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Message from '../components/Message';
//import Modal from 'react-modal'

const HomeScreen = () => {

	const userLogin = useSelector(state => state.userLogin)
	const {loading, error, userInfo} = userLogin

	const [item, setitem] = useState('');
	const [bag, storebagitems] = useState([]);
	const [message, setMessage] = useState('')
	const [show, setShow] = useState(false);

  	const handleClose = () => setShow(false);
  	const handleShow = () => setShow(true);


	const handlelist = (event) => {
		setitem(event.target.value);
	}

	const handlebag = () => {
		if(!userInfo) {
			setMessage('You must sign in to add items')
		}
		else {
			if(item.length==0) {
				setMessage('Please add item')
			}
			else {
				storebagitems((prevValue) => {
				return [...prevValue, item];
				});
			}
		setitem('');
		}
	};

	return (
		<div>
			{message && <Message variant='danger'>{message}</Message>}
			<Card style={{ width: '18rem' }}>
			  <Card.Body>
			    <Card.Title>My Task</Card.Title>
			    <Card.Text style={{display: 'flex', alignItem: 'center', justifyContent: 'space-between'}}>
			     <span> <input type="text" value={item} onChange={handlelist} placeholder="Add Task"/> </span>
			     <span> <Button className="btn-sm" variant="primary" onClick={handlebag}><i className="fas fa-plus"></i></Button> </span>
			    </Card.Text>
			    
			    	{bag.map(item => (
			    		<div style={{display: 'flex', alignItem: 'center', justifyContent: 'space-between'}}>
				     		<span><h5>{item}</h5></span>
				     		<span><Button className="btn-sm" variant="primary" onClick={handleShow}><i class="fas fa-pencil-alt"></i></Button></span>
				     	</div>
			     	))}
			  </Card.Body>
			</Card>
			<Modal show={show} onHide={handleClose}>
		        <Modal.Header closeButton>
		          <Modal.Title><i class="fas fa-building"></i> Campus build </Modal.Title>
		        </Modal.Header>
		        <Modal.Body><textarea rows="4" cols="50" placeholder="Add details"></textarea></Modal.Body>
		        <Modal.Footer>
		          <Button variant="secondary" onClick={handleClose}>
		            Close
		          </Button>
		          <Button variant="primary" onClick={handleClose}>
		            Save Changes
		          </Button>
		        </Modal.Footer>
		     </Modal>
		</div>
		)
}

export default HomeScreen