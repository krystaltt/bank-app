require("dotenv").config();
const express = require("express");
const session=require('express-session')
const app = express();
const cors = require("cors");
const connection = require("./db");
const registerRoutes = require("./routers/register");
const loginRoutes = require("./routers/login");
const balanceRouter = require("./routers/balance");

//database connection
connection();

//middlewares
app.use(express.json());
app.use(cors());


//routes
app.use("/api", registerRoutes);
app.use("/api", loginRoutes);
app.use("/api", balanceRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listen on port ${port}...`));
