import { Client } from 'pg'

const client = new Client({
	user: 'postgres',
	password: 'postgres',
	host: 'localhost',
	port: 5432,
	database: 'perntodo',
})

export default client
