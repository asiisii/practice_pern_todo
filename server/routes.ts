import express from 'express'
import getTodos from './routes/getTodosRoute'
import createTodo from './routes/createTodoRoute'
import deleteTodo from './routes/deleteTodoRoute'
import { updateTextTodo } from './routes/updateTodoRoute'

const router = express.Router()

router.get('/todos', getTodos)
router.post('/todos', createTodo)
router.delete('/todos/:id', deleteTodo)
router.patch('/todos/:id', updateTextTodo)

export default router
