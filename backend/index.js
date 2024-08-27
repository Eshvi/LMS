import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import UserRouter from './Route/UserRoute.js'

import cors from 'cors'
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", UserRouter);

mongoose.connect("mongodb://localhost:27017/mydb").then(() => {
  console.log("Connected to MongoDB");
  app.listen(3001, () => {
    console.log("Server started...")
  })
}).catch(err => {
  console.log(err);
});

// http://localhost:3001/user/signup