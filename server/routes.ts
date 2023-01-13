import express from 'express'
import getTodos from './routes/getTodosRoute'
import createTodo from './routes/createTodoRoute'

const router = express.Router()

router.get('/todos', getTodos)
router.post('/todos', createTodo)

export default router
