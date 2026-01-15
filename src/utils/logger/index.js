const { createLogger, format, transports } = require("winston");
const { timestamp, json, combine } = format;

// Console transport
const consoleTransport = new transports.Console({
  level: "info",
  format: combine(timestamp(), json()),
});

// File transport
const fileTransport = (level, filename) => {
  return new transports.File({
    level: level || "info",
    format: combine(timestamp(), json()),
    filename: filename || "logs/info/info.log",
  });
};

const infoFileTransport = fileTransport("info", "logs/info/info.log");
const errorFileTransport = fileTransport("error", "logs/error/error.log");

const logger = createLogger({
  level: "info",
  transports: [consoleTransport, infoFileTransport, errorFileTransport],
});

module.exports = logger;
