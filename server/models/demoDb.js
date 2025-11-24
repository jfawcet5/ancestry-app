//const { Pool } = require("pg");
import {Pool} from "pg";
import config from "../config/env.js";

let db = null;

if (config.DEMO_DB_URL) {
    db = new Pool({
        connectionString: config.DEMO_DB_URL,
        connectionTimeoutMillis: 2000
    });
}

export default db;