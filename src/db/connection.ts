import mongoose from "mongoose";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
  // useFindAndModify: false
};
// await mongoose.connect(process.env.MONGO_URL,options)
const connection = async (url: string) =>
  await mongoose
    .connect(url, options)
    .then(() => console.log("connected to database"));
export default connection;
