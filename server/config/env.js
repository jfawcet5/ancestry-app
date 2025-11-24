//require("dotenv").config();
import dotenv from "dotenv";
dotenv.config();

const config = {
    PORT: process.env.PORT || 3001,
    DATABASE_URL: process.env.DATABASE_URL,
    DEMO_DB_URL: process.env.DEMO_DB_URL || null,
    LOG_LEVEL: process.env.LOG_LEVEL || "INFO",
    LOG_PATH: process.env.LOG_PATH || "",
    JWT_SECRET: process.env.JWT_SECRET || "",
    CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",
    MAX_DEMO_ROWS: process.env.MAX_DEMO_ROWS || 100,
}

export default config;