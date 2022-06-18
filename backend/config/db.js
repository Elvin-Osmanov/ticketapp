const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB);
    console.log(
      `Mongo connected: ${conn.connection.host}`.bgGreen.underline.bold
    );
  } catch (error) {
    console.log(`Error: ${error.message}`.bgRed.underline.bold);
    process.exit(1);
  }
};

module.exports = connectDB;
