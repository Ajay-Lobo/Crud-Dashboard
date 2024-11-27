/* eslint-disable no-undef */
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db.js';
import router from './src/routes/index.js'; 
const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

app.get('/', (req, res) => {
    res.send('Hello World');
    }
);

app.use('/api', router);


connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Database connection failed: ${error.message}`);
    process.exit(1);
  });