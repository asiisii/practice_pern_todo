import client from '../../config/db'

const checkTodoExists = async (id: string): Promise<boolean> => {
	try {
		const todo = await client.query('SELECT * FROM TODO WHERE todoid = $1', [
			id,
		])
		return todo.rows.length > 0
	} catch (error) {
		throw error
	}
}

export default checkTodoExists
