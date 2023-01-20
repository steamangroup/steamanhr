import mongoose from "mongoose";

const connectMongo = async () => {
  console.log("Connection here");
  try {
    //returns the connection object
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    if (connection.readyState == 1) {
      console.log(`This is my environment ${process.env.MONGO_URI}`);
      console.log("Database connected");
    }
  } catch (errors) {
    return Promise.reject(errors);
  }
};

export default connectMongo;
