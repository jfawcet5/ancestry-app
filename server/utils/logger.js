const fs = require('fs');
const config = require("../config/env");
const path = require('path');

const LOG_LEVELS = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
    OFF: 99
};


class Logger{
    constructor(level = "INFO", name="App") {
        // Only prints logs when level if >= logger level
        this.level = level;
        this.name = name;
        this.logDir = path.resolve(config.LOG_PATH);
    }

    _canLogLevel(level) {
        return LOG_LEVELS[level] >= LOG_LEVELS[this.level];
    }

    _format(level, message, meta) {
        const time = new Date().toISOString();
        const metaString = meta ? meta : '';
        return `${time} | ${this.name} | ${level} | ${message} | ${metaString}`;
    }

    debug(message, meta) {
        if (this._canLogLevel('DEBUG')) {
            console.debug(this._format('DEBUG', message, meta));
        }
    }

    info(message, meta) {
        if (this._canLogLevel('INFO')) {
            console.debug(this._format('INFO', message, meta));
        }
    }

    warn(message, meta) {
        if (this._canLogLevel('WARN')) {
            console.debug(this._format('WARN', message, meta));
        }
    }

    error(message, meta) {
        if (this._canLogLevel('ERROR')) {
            console.debug(this._format('ERROR', message, meta));
        }
    }

    saveToFile(name, data, ext="txt") {
        if (this.level === "OFF") {
            return;
        }

        const timestamp = new Date().toISOString().replace("/[:.]/g", "-");
        const extension = ext ? `.${ext}` : '';
        const fileName = `${name}_${timestamp}${extension}`;
        const filePath = path.join(this.logDir, fileName);

        try {
            const content = typeof data === "string" ? data : JSON.stringify(data, null, 2);
            fs.writeFileSync(filePath, content, "utf-8");
            return filePath;
        }
        catch (err) {
            this.error(`Failed to save log file: ${fileName}`, err.message);
            return null;
        }
    }
}

let log_level = config.LOG_LEVEL;
console.log(`Log level: ${log_level}`);

const logger = new Logger(log_level, "Server")
module.exports = { logger };