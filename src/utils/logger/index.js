const { createLogger, format, transports } = require("winston");
const { colorize, timestamp, json, combine } = format;

// Console transport
const consoleTransport = new transports.Console({
  level: "info",
  format: combine(colorize(), timestamp(), json()),
});

// File transport

const logger = createLogger({
  level: "info",
  transports: [consoleTransport],
});

module.exports = logger;
