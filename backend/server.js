const express = require("express");
const colors = require("colors");
const dotnenv = require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/user"));

app.use(errorHandler);

app.listen(PORT, () => console.log("server started " + process.env.PORT));
