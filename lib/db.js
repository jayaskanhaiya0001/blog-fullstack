import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://jayaskanhaiya0001:Kanh2001@cluster0.v4u7n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
};

export default connectDB;