const express = require("express");
const app = express();

const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const pollRoutes = require("./routes/poll.routes");

const categoryRoutes = require("./routes/category.route");

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/poll", pollRoutes);
app.use("/categories", categoryRoutes);

module.exports = app;
