//const { Pool } = require("pg");
import {Pool} from "pg";
import config from "../config/env.js";

const db = new Pool({
    connectionString: config.DATABASE_URL
});

export default db;