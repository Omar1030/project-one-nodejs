// ! Packages
const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect(process.env.DATA_BASE_CONNECTION)
    .then(() => console.log("Successful connection to DataBase"))
    .catch((e) => console.log("Failed connection to DataBase!"));
};

module.exports = connectDB;
