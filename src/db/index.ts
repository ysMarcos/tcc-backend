import { MySql2Database, drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { migrate } from 'drizzle-orm/mysql2/migrator';

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tcc"
});

export const db: MySql2Database = drizzle(connection);

await migrate(db, { migrationsFolder: './src/db/migrations' });
