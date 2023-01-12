import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { todoApiSlice } from './features/api/todoApiSlice'
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ApiProvider api={todoApiSlice}>
			<App />
		</ApiProvider>
	</React.StrictMode>
)
