import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Todo {
	text: string
	isComplete: boolean
}

type AllTodos = {
	_id: string
	text: string
	isComplete: boolean
}[]

export const todoApiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5001' }),
	tagTypes: ['Todos'],
	endpoints: builder => ({
		getTodo: builder.query({
			query: () => '/todos',
			transformResponse: (todos: AllTodos) => todos.reverse(),
			providesTags: ['Todos'],
		}),
		addTodo: builder.mutation({
			query: (todo: Todo) => ({
				url: '/todos',
				method: 'POST',
				body: JSON.stringify(todo),
				headers: {
					'Content-Type': 'application/json',
				},
			}),
			invalidatesTags: ['Todos'],
		}),
		deleteTodo: builder.mutation({
			query: (id: string) => ({
				url: `/todos/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Todos'],
		}),
		toggleComplete: builder.mutation({
			query: (id: string) => ({
				url: `/todos/${id}/complete`,
				method: 'PATCH',
			}),
			invalidatesTags: ['Todos'],
		}),
		updateTodo: builder.mutation({
			query: (updatedTodo: {
				id: string
				text: string
				isComplete: boolean
			}) => ({
				url: `/todos/${updatedTodo.id}`,
				method: 'PATCH',
				body: JSON.stringify(updatedTodo),
				headers: {
					'Content-Type': 'application/json',
				},
			}),
			invalidatesTags: ['Todos'],
		}),
	}),
})

export const {
	useGetTodoQuery,
	useAddTodoMutation,
	useDeleteTodoMutation,
	useToggleCompleteMutation,
	useUpdateTodoMutation,
} = todoApiSlice
