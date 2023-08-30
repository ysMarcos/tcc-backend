import { Config } from 'drizzle-kit';

export default {
    schema: "./src/modules/*/schema.ts",
    out: "./src/db/migrations",
    driver: "mysql2",
    dbCredentials: {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: "tcc"
    }
} satisfies Config
