import { Config } from 'drizzle-kit';
import { dbCredencial } from './env';

export default {
    schema: "./src/modules/*/schema.ts",
    out: "./src/db/migrations",
    driver: "mysql2",
    dbCredentials: {
        host: dbCredencial.host,
        port: dbCredencial.port,
        user: dbCredencial.username,
        password: dbCredencial.password,
        database: dbCredencial.database
    }
} satisfies Config
