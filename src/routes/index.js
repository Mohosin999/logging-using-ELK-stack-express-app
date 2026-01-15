const { Router } = require("express");

const router = Router();

router.get("/users", (_req, res) => {
  res.json({
    name: "Mohammad Mohosin",
    age: 27,
  });
});

router.post("/users", (req, res, next) => {
  try {
    const { name, age } = req.body;
    if (!name || !age) {
      throw new Error("Name and age is required");
    }

    res.json({ message: "User created successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
