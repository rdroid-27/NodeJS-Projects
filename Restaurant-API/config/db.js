const mongoose = require('mongoose');

const connectDB=async ()=>{
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.log({
      error: error,
      message:"Error connecting to DATABASE!"
    });
  }
}

module.exports= connectDB;