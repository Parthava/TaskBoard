const express = require('express')
const asyncHandler = require('express-async-handler')
const uuid = require('uuid')
const { JsonDB } = require('node-json-db')
const { Config } = require('node-json-db/dist/lib/JsonDBConfig')
const bcrypt = require('bcryptjs');

const app = express()
app.use(express.json())

const db = new JsonDB(new Config('TaskBoardDB', true, false, '/'))

app.get('/', (req,res) => {
	res.json({ message: 'TaskBoard Server' })
	//res.send("hello")
})

app.post('/api/register', asyncHandler(async(req,res) => {
	const id = uuid.v4()
	const {email, username, password} = req.body

	const path = `/${email}`
	let next = true;

	try {
		const userExist = db.getData(path)
		next = false;
		res.status(400).json({message: 'Email already used'})
		throw new Error('Email already exits')
	}
	catch {
		//console.log("-------------------------------", next)
		if(next==true)
		{
			const salt = bcrypt.genSaltSync(10);
			const hashPassword = bcrypt.hashSync(password, salt);

			try {
				const path = `/${email}`
				db.push(path, {id,username,hashPassword})
				res.json({id,email,username})
			}
			catch (error) {
				console.log(error)
				res.status(500).json({message: 'Error on server'})
				throw new Error(`Server error: ${error}`)
			}
		}
	}

}))

app.post('/api/login', asyncHandler(async(req,res) => {
	const {email, password} = req.body

	const path = `/${email}`

	try {
		const user = db.getData(path)
		const {id, email, username, hashPassword} = user
		const verified = bcrypt.compareSync(password, hashPassword);
		if(verified) {
			res.json({id,email,username})
		}
		else {
			res.status(500).json({message: 'Incorrect password'})
			throw new Error('Incorrect password')
		}
	}
	catch(error) {
		console.log(error)
		res.status(500).json({message: 'Invalid email'})
		throw new Error('Invalid email or password')
	}

}))

const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))