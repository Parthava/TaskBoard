import React, {useState} from 'react';

const Listcom = (props) => {
	const [state, setstate] = useState("none");

	const handlestate = () =>  {
		setstate("line-through");
	}
	return (
			<div className="todo_style">
				<span onClick={handlestate}><i class="fas fa-trash-alt"></i></span>
				<li style={{ textDecoration: state }}>{props.data} </li>
			</div>
		);
};

export default Listcom;