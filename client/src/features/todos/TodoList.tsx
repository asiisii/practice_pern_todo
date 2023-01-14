import TodoItem from './TodoItem'

type TodoListProps = {
	todoList: {
		todoid: string
		text: string
		iscomplete: boolean
	}[]
}

const TodoList = ({ todoList }: TodoListProps) => {
	return (
		<ul className='max-h-[90vh] min-w-full overflow-y-auto'>
			{todoList.map(todo => (
				<TodoItem
					todoid={todo.todoid}
					text={todo.text}
					isComplete={todo.iscomplete}
					key={`${window.crypto.getRandomValues}`}
				/>
			))}
		</ul>
	)
}

export default TodoList
