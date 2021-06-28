import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(
      `MongoDB Connected (at): ${conn.connection.host}`.underline.blue
    );
  } catch (error) {
    console.error(`Error : ${error.message} `.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
