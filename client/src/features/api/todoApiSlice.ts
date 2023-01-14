import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Todo {
	text: string
}

type AllTodos = {
	todoid: string
	text: string
	iscomplete: boolean
}[]

export const todoApiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
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
				todoid: string
				text: string
				iscomplete: boolean
			}) => ({
				url: `/todos/${updatedTodo.todoid}`,
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
