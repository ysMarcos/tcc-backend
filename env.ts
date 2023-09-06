import * as dotenv from "dotenv";

dotenv.config();

export const expressPort = process.env.PORT || 3000;
export const jwtSecret = process.env.JWT_SECRET || "";

export const dbCredencial = {
    host: process.env.DB_HOST || "",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "",
}
