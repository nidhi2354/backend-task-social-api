const express = require("express");
const app = express();

app.use(express.json());

const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

module.exports = app;
