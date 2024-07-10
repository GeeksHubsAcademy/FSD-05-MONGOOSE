import mongoose from "mongoose";

// const MONGO_URI = `mongodb://root:root@localhost:27018/test?authSource=admin`;

export const dbConnection = () => {
  console.log('Start connection');
	return mongoose.connect(
    process.env.MONGO_URI,
    {}
  );
};
