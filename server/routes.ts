import express from 'express'
import getTodos from './routes/getTodosRoute'
import createTodo from './routes/createTodoRoute'
import deleteTodo from './routes/deleteTodoRoute'

const router = express.Router()

router.get('/todos', getTodos)
router.post('/todos', createTodo)
router.delete('/todos/:id', deleteTodo)

export default router
