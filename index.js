// ! Packages
const express = require("express");
const dotenv = require("dotenv");

// ! Utils
const connectDB = require("./utils/dbConnection.js");
const errorHandler = require("./middleware/err-middleware.js");

// ! Routes
const productRouter = require("./routes/products-route");
const authRouter = require("./routes/auth-route.js");

// ! App
const app = express();
dotenv.config({ path: "./config/.env" });
app.use(express.json());

// ! Middleware
app.use("/api/welcome", (_, res) => res.status(200).json({ Message: "Welcome to SHOP.CO" }));
app.use("/api/products", productRouter);
app.use("/api/auth", authRouter);
app.use(errorHandler);

// ! DataBase Connection
connectDB();

// ! Server Port
app.listen(process.env.SERVER_PORT, () => {
  console.log("Server is running on port", process.env.SERVER_PORT);
});
