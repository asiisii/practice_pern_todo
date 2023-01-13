import express from 'express'
import cors from 'cors'
import client from './db.js'

// Create an express app
const app = express()

const port = 3000

//middleware
app.use(cors())
app.use(express.json())

//routes

app.post('/todos', async (req, res) => {
  
})

// create new todo
app.post('/todos', async (req, res) => {
	try {
	} catch (error) {
		console.log('====================================')
		// console.error(error.message)
    console.log(error);
    console.log('====================================');
	}
})

// get todos

app.listen(5000, () => {
	console.log('====================================')
	console.log('server has started on port 5000')
	console.log('====================================')
})
