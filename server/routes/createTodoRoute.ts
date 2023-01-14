import { Request, Response } from 'express'
import client from '../config/db'

const createTodo = async (req: Request, res: Response) => {
	try {
		const { text } = req.body
		const newTodo = await client.query('INSERT INTO todo (text) VALUES($1) RETURNING *', [
			text,
		])
		res.status(201).json(newTodo.rows[0])
	} catch (error) {
		console.log('====================================')
		console.log({ caughtErr: error })
		console.log('====================================')
		res.status(400).json({ message: error })
		console.log('====================================')
	}
}

export default createTodo
