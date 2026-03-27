import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Todo");
    console.log("Connected to Database.");
  } catch (err) {
    console.log("Error connecting database:", err);
    process.exit(1);
  }
};

export default connectToDB;
