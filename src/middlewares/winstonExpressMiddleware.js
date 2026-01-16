const expressWinston = require("express-winston");
const logger = require("../utils/logger");

const expressWinstonLogger = (level) => {
  return expressWinston.logger({
    level: (_req, res) => {
      if (res.statusCode >= 500) return "error";
      if (res.statusCode >= 400) return "warn";
      return "info";
    },
    winstonInstance: logger,
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}} {{res.responseTime}}",
    expressFormat: true,
    colorize: false,
  });
};

const expressInfoLogger = expressWinstonLogger("info");
const expressErrorLogger = expressWinstonLogger("error");

module.exports = { expressInfoLogger, expressErrorLogger };
