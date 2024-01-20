import mongoose from 'mongoose';
import colors from 'colors';

const connectDB= async()=>{
  try {
    const conn= await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.bgMagenta.white);

  } catch (error) {
      console.log(`MongoDB error : ${error}`.bgRed.white);
  }
}
export default connectDB;