const { createLogger, format, transports } = require("winston");
const { timestamp, json, combine } = format;

// Console transport
const consoleTransport = new transports.Console({
  level: "info",
  format: combine(timestamp(), json()),
});

// File transport
const fileTransport = new transports.File({
  level: "info",
  format: combine(timestamp(), json()),
  filename: "logs/info/info.log",
});

const logger = createLogger({
  level: "info",
  transports: [consoleTransport, fileTransport],
});

module.exports = logger;
