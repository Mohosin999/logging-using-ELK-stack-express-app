const express = require("express");
const app = express();
const userRouter = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRouter);

app.use((error, req, res, _next) => {
  const errorObj = {
    message: error?.message || "Something went wrong",
    correlationId: req.headers["x-correlation-id"],
    status: error?.status || 500,
  };

  logger.error(JSON.stringify(errorObj));

  res.status(errorObj.status).json(errorObj);
});

app.listen(4000, () => {
  console.log("http://localhost:4000");
});
