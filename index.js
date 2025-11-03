// ! Packages
const express = require("express");
const dotenv = require("dotenv");

// ! Utils
const connectDB = require("./utils/dbConnection.js");
const errorHandler = require("./middleware/err-middleware.js");

// ! Routes
const productRouter = require("./routes/products-route");

// ! App
const app = express();
dotenv.config({ path: "./config/.env" });
app.use(express.json());

// ! Middleware
app.use("/welcome", (_, res) => res.status(200).json({ Message: "Welcome to our website" }));
app.use("/api/products", productRouter);
app.use(errorHandler);

// ! DataBase Connection
connectDB();

// ! Server Port
app.listen(process.env.SERVER_PORT, () => {
  console.log("Server is running on port", process.env.SERVER_PORT);
});
