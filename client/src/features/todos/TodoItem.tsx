import { useState } from 'react'
import {
	useDeleteTodoMutation,
	useToggleCompleteMutation,
	useUpdateTodoMutation,
} from '../api/todoApiSlice'
import { FaTrashAlt, FaEdit, FaWindowClose, FaSave } from 'react-icons/fa'

type TodoItemProps = {
	id: string
	text: string
	isComplete: boolean
}

const TodoItem = ({ id, text, isComplete }: TodoItemProps) => {
	const [show, setShow] = useState(false)
	const [description, setDescription] = useState(text)

	const [deleteTodo] = useDeleteTodoMutation()
	const [toggleComplete] = useToggleCompleteMutation()
	const [updateTodo] = useUpdateTodoMutation()

	const showEditModal = () => setShow(prevShow => !prevShow)

	const updateTodoItem = () => {
		const updatedTodo = {
			id: id,
			text: description,
			isComplete: isComplete,
		}
		updateTodo(updatedTodo)
		showEditModal()
	}

	return show ? (
		<form
			className='flex items-center min-w-sm justify-between mt-2 bg-[#A98E4D] rounded-xl p-2'
			onSubmit={e => e.preventDefault()}
			key={id}
		>
			<input
				type='text'
				value={description}
				onChange={e => setDescription(e.target.value)}
				autoFocus
			/>
			<section className='flex'>
				<button className='pr-6' onClick={updateTodoItem}>
					<FaSave color='#05AEA0' />
				</button>
				<button onClick={showEditModal}>
					<FaWindowClose />
				</button>
			</section>
		</form>
	) : (
		<div
			key={id}
			className='flex justify-between mt-2 bg-[#A98E4D] rounded-xl p-2'
		>
			<section className='flex items-center'>
				<input
					type='checkbox'
					checked={isComplete}
					onChange={() => toggleComplete(id)}
					className='items-center'
				/>
				<div
					className={`pl-3 max-w-sm break-words whitespace-pre-wrap items-center ${
						isComplete ? 'line-through' : 'no-underline'
					}`}
				>
					{text}
				</div>
			</section>
			<section className='flex'>
				<button className='pr-6' onClick={showEditModal}>
					<FaEdit color='#05AEA0' />
				</button>
				<button onClick={() => deleteTodo(id)}>
					<FaTrashAlt color='red' />
				</button>
			</section>
		</div>
	)
}

export default TodoItem
