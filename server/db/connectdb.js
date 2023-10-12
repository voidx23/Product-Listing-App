import mongoose from "mongoose";


async function connectDb() {
   try {
      const db = await mongoose.connect(process.env.MONGO_URL, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB");
   } catch (error) {
      console.error("Error connecting to MongoDB:", error);
   }
}




export default connectDb


