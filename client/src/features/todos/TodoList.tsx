import TodoItem from './TodoItem'

type TodoListProps = {
	todoList: {
		_id: string
		text: string
		isComplete: boolean
	}[]
}

const TodoList = ({ todoList }: TodoListProps) => {
	return (
		<ul className='max-h-[90vh] min-w-full overflow-y-auto'>
			{todoList.map(todo => (
				<TodoItem
					id={todo._id}
					text={todo.text}
					isComplete={todo.isComplete}
					key={todo._id}
				/>
			))}
		</ul>
	)
}

export default TodoList
