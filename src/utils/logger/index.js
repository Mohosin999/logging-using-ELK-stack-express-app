require("winston-daily-rotate-file");
const { createLogger } = require("winston");
const {
  consoleTransport,
  infoFileTransport,
  errorFileTransport,
} = require("./transports");

const logger = createLogger({
  level: "info",
  transports: [consoleTransport, infoFileTransport, errorFileTransport],
});

module.exports = logger;
