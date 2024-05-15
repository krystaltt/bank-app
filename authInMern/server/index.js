require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const registerRoutes = require("./routers/register");
const loginRoutes = require("./routers/login");
const withdrawRouter = require("./routers/withdraw");
const depositRouter = require("./routers/deposit");

//database connection
connection();

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/api", registerRoutes);
app.use("/api", loginRoutes);
app.use("/api", withdrawRouter);
app.use("/api", depositRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listen on port ${port}...`));
