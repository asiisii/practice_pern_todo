import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface Todo {
	id: number
	text: string
	isCompleted: boolean
}

const App = () => {
	const [todos, setTodos] = useState<Todo[]>([])
	const { register, handleSubmit } = useForm()
	const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
	const [isDarkMode, setIsDarkMode] = useState(false)

	useEffect(() => {
		const rootElement = document.getElementById('root')
		rootElement.className = `${isDarkMode ? 'dark' : 'light'}-mode bg-gray-${
			isDarkMode ? '900' : '100'
		}`
	}, [isDarkMode])

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode)
	}

	const getTodos = () => {
		// Here, you would make a request to your server to fetch the TODOs
		const newTodos: Todo[] = [
			{
				id: 1,
				text: 'Take out the trash',
				isCompleted: false,
			},
			{
				id: 2,
				text: 'Do the dishes',
				isCompleted: false,
			},
			{
				id: 3,
				text: 'Vacuum the house',
				isCompleted: false,
			},
		]
		setTodos(newTodos)
	}

	const addTodo = (text: string) => {
		// Here, you would make a request to your server to add the new TODO
		const newTodo: Todo = {
			id: todos.length + 1,
			text,
			isCompleted: false,
		}
		setTodos([...todos, newTodo])
	}

	const editTodo = (id: number, text: string) => {
		// Here, you would make a request to your server to edit the TODO
		const updatedTodos = todos.map(todo => {
			if (todo.id === id) {
				return {
					...todo,
					text,
				}
			}
			return todo
		})
		setTodos(updatedTodos)
	}

	const markAsComplete = (id: number) => {
		// Here, you would make a request to your server to mark the TODO as complete
		const updatedTodos = todos.map(todo => {
			if (todo.id === id) {
				return {
					...todo,
					isCompleted: true,
				}
			}
			return todo
		})
		setTodos(updatedTodos)
	}

	const deleteTodo = (id: number) => {
		// Here, you would make a request to your server to delete the TODO
		const updatedTodos = todos.filter(todo => todo.id !== id)
		setTodos(updatedTodos)
	}

	const startEditingTodo = (todo: Todo) => {
		setEditingTodo(todo)
	}

	const cancelEditingTodo = () => {
		setEditingTodo(null)
	}

	return (
		<div
			className={`mx-auto p-4 max-w-md ${
				isDarkMode ? 'dark' : 'light'
			}-mode bg-gray-${isDarkMode ? '900' : '100'} min-h-screen`}
		>
			<button
				onClick={toggleDarkMode}
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
			>
				Toggle Dark Mode
			</button>
			<h1 className='font-bold text-3xl mb-2 text-gray-800 text-center'>
				TODO App
			</h1>
			<button
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
				onClick={getTodos}
			>
				Get TODOs
			</button>
			<form
				className='mb-2'
				onSubmit={handleSubmit(data => addTodo(data.todoText))}
			>
				<input
					className='border rounded w-full py-2 px-3'
					type='text'
					placeholder='Add TODO'
					{...register('todoText')}
				/>
				<button
					className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
					type='submit'
				>
					Add TODO
				</button>
			</form>
			{editingTodo && (
				<form
					className='mb-2'
					onSubmit={handleSubmit(data =>
						editTodo(editingTodo.id, data.todoText)
					)}
				>
					<input
						className='border rounded w-full py-2 px-3'
						type='text'
						defaultValue={editingTodo.text}
						{...register('todoText')}
					/>
					<button
						className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
						type='submit'
					>
						Save
					</button>
					<button
						className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2'
						onClick={cancelEditingTodo}
					>
						Cancel
					</button>
				</form>
			)}
			<ul className='list-reset'>
				{todos.map(todo => (
					<li
						key={todo.id}
						className='mb-2 py-2 px-4 rounded-md bg-gray-100 flex items-center justify-between'
					>
						<div className='flex items-center'>
							<input
								type='checkbox'
								checked={todo.isCompleted}
								onChange={() => markAsComplete(todo.id)}
								className='mr-2'
							/>
							<span
								className={`${
									todo.isCompleted
										? 'line-through text-gray-600'
										: 'text-gray-800'
								}`}
							>
								{todo.text}
							</span>
						</div>
						{!editingTodo || editingTodo.id !== todo.id ? (
							<button
								className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
								onClick={() => startEditingTodo(todo)}
							>
								Edit
							</button>
						) : null}
						<button
							className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
							onClick={() => deleteTodo(todo.id)}
						>
							Delete
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}

export default App
