const mongoose = require("mongoose");
const config = require("config");
module.exports = () => {
  // Prepare for Mongoose 7 default (strictQuery will default to false)
  // Explicitly setting it avoids the deprecation warning and makes behavior clear.
  mongoose.set('strictQuery', false);
  mongoose.set('bufferCommands', false);
  // Avoid creating multiple connections in serverless environments by
  // reusing the existing Mongoose connection when available.
  if (mongoose.connection && mongoose.connection.readyState === 1) {
    return mongoose;
  }

  mongoose
    .connect(config.get("db.mongo.uri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })
    .then(() => console.log("MongoDB connected!"))
    .catch((err) => {
      // Log error but do not terminate the process. In serverless environments
      // calling process.exit will crash the function — prefer logging so the
      // platform can surface the error and the function can fail gracefully.
      console.error("MongoDB connection error:", err);
    });

  mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
  });

  return mongoose;
};
