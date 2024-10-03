import mongoose from "mongoose";

const databaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Database connection is established");
  } catch (e) {
    console.log("error in db connection", e);
  }
};

export default databaseConnection;
