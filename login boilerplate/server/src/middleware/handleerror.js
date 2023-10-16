function errorHandler(err, req, res, next) {
  console.error("Express Error", err.name, err.message);
  res.status(500).json({ error: "Internal Server Error" });
  process.exit(1);
}

module.exports = errorHandler;
