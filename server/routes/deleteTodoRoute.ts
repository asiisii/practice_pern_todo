import { Request, Response } from 'express'
import client from '../config/db'

const deleteTodo = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
    console.error(req.params)
		await client.query('DELETE FROM todo WHERE todoid = $1', [id])
		res.json({ message: 'Todo Deleted' })
	} catch (error) {
		console.log({ caughtErr: error })
		res.status(500).json({ message: error })
	}
}

export default deleteTodo
