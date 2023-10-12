import express from 'express';
import connectDb from './db/connectdb.js';
import dotenv from "dotenv";
import categoryRoute from './routes/categoryRoute.js';
import productRoute from './routes/productRoute.js';
import cors from 'cors';





const app = express();

const PORT = process.env.PORT || 5000;
dotenv.config();

app.use(express.json());


connectDb();


app.use(cors());


//Routes

app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);


app.listen(PORT,()=>{
    console.log("listening to port 5000");
})