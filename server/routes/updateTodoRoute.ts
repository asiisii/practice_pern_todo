import { Request, Response } from 'express'
import client from '../config/db'
import checkTodoExists from './shared/checkTodoExists'

export const updateTextTodo = async (req: Request, res: Response) => {
	try {
		const { body, params } = req
		const { id } = params
		const { text } = body
		const todoExists = checkTodoExists(id)

		if (!todoExists) {
			res.status(404).json({ message: 'Todo not found' })
			return
		}

		const updatedTodo = await client.query(
			'UPDATE TODO SET text = $1 WHERE todoid = $2 RETURNING *',
			[text, id]
		)

		res.json(updatedTodo)
	} catch (error) {
		res.status(400).json({ message: error })
	}
}
