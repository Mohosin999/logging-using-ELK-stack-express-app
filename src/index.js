const express = require("express");
const userRouter = require("./routes");
const logger = require("./utils/logger");
const correlationId = require("./middlewares/setCorrelationId");
const {
  expressInfoLogger,
  expressErrorLogger,
} = require("./middlewares/winstonExpressMiddleware");

// express app
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(correlationId);

// express winston info logger
app.use(expressInfoLogger);

app.use(userRouter);

// express winston error logger
app.use(expressErrorLogger);

// error handler
app.use((error, req, res, _next) => {
  const errorObj = {
    message: error?.message || "Something went wrong",
    correlationId: req.headers["x-correlation-id"],
    status: error?.status || 500,
  };

  // logger.error(JSON.stringify(errorObj));

  res.status(errorObj.status).json(errorObj);
});

// start server
app.listen(4000, () => {
  console.log("http://localhost:4000");
});
