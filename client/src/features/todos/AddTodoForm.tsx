import TodoList from './TodoList'
import { useGetTodoQuery, useAddTodoMutation } from '../api/todoApiSlice'
import { useForm } from 'react-hook-form'

type Inputs = {
	text: string
}

const AddTodoForm = () => {
	const { data: todoList, isLoading, isSuccess, isError } = useGetTodoQuery([])
	const [addTodo] = useAddTodoMutation()
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Inputs>()

	const onSubmit = (data: { text: string }) => {
		const newData = {
			text: data.text,
			isComplete: false,
		}

		addTodo(newData)
		reset()
	}
	return (
		<div className='flex flex-col justify-between mr-auto ml-auto mt-12 text-4xl max-w-xl items-center max-h-[70vh] overflow-hidden'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='text-lg sm:text-sm'>
					{errors.text && (
						<p className='bg-red-500 text-white '>This field is required</p>
					)}
					<input
						placeholder=' Add todo...'
						{...register('text', { required: true })}
						className='rounded-l-xl p-5 caret-[#05AEA0]'
						autoComplete='off'
					/>

					<input
						className='bg-[#6744a9] hover:bg-[#05AEA0] cursor-pointer rounded-r-xl p-5'
						type='submit'
					/>
				</div>
			</form>
			{isError ? (
				<>Oh no, there was an error, check to see if the server is running.</>
			) : isLoading ? (
				<>Loading...</>
			) : isSuccess ? (
				<TodoList todoList={todoList} />
			) : (
				'You have no todo task'
			)}
		</div>
	)
}

export default AddTodoForm
