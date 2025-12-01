import Database from 'better-sqlite3'

const db = new Database('./data/database.sqlite')

db.prepare("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)").run()

export default db
