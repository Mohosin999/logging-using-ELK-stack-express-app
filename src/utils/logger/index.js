require("winston-daily-rotate-file");
const { createLogger, format, transports } = require("winston");
const { timestamp, json, combine } = format;

// Console transport
const consoleTransport = new transports.Console({
  level: "info",
  format: combine(timestamp(), json()),
});

// File transport
// const fileTransport = (level, filename) => {
//   return new transports.File({
//     level: level || "info",
//     format: combine(timestamp(), json()),
//     filename: filename || "logs/info/info.log",
//   });
// };

const fileTransport = (level, filename) => {
  return new transports.DailyRotateFile({
    level: level || "info",
    format: combine(timestamp(), json()),
    filename: filename || "info-%DATE%.log",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
  });
};

const infoFileTransport = fileTransport("info", "logs/info/info-%DATE%.log");
const errorFileTransport = fileTransport(
  "error",
  "logs/error/error-%DATE%.log"
);

const logger = createLogger({
  level: "info",
  transports: [consoleTransport, infoFileTransport, errorFileTransport],
});

// Winston rotate file
// // fired when a log file is created
// fileTransport().on("new", (filename) => {});
// // fired when a log file is rotated
// fileTransport().on("rotate", (oldFilename, newFilename) => {});
// // fired when a log file is archived
// fileTransport().on("archive", (zipFilename) => {});
// // fired when a log file is deleted
// fileTransport().on("logRemoved", (removedFilename) => {});

module.exports = logger;
