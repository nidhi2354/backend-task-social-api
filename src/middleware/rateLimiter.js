const rateLimit = require("express-rate-limit");

const createPollLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Too many requests",
});

module.exports = createPollLimiter;
