import { Request, Response } from 'express'
import client from '../config/db'

const getTodos = async (req: Request, res: Response) => {
	try {
		const allTodos = await client.query('SELECT * FROM todo')
		res.status(200).json(allTodos.rows)
	} catch (error) {
    console.log('====================================');
    console.log({ caughtErr: error });
    console.log('====================================');
		res.status(500).json({ message: error })
		console.log('====================================')
	}
}

export default getTodos
