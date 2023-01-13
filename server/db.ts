import { Client } from 'pg'

const client = new Client({
	host: 'perntodo',
	port: 5334,
	user: 'postgres',
	password: 'postgres',
})

export default client
