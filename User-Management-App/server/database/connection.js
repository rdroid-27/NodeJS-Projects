const mongoose= require('mongoose');
const connectDB= async ()=>{
  try {
    // mongodb connection string
    const con= await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database connected : ${con.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
module.exports= connectDB;