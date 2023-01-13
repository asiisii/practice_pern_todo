import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './routes'
import client from './config/db'

client.connect(err => {
	if (err) {
		console.error('connection error', err.stack)
	} else {
		client.query('SELECT current_database()', (err, res) => {
			if (err) {
				console.error('error running query', err)
			} else {
				console.log('Connected to ' + res.rows[0].current_database)
			}
			// client.end()
		})
	}
})

dotenv.config()

// Create an express app
const app = express()

//middleware
app.use(cors())
app.use(express.json())

//routes
app.get('/', (req: Request, res: Response) => {
	res.status(200).send('API is running...')
})
app.use(router)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
	console.log('====================================')
	console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
	console.log('====================================')
})
