import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';

// App config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//middlewares
app.use(express.json());
app.use(cors());

// API Endpoints
app.get('/', (req, res) => res.status(200).send('Hello World'));

app.listen(port, () => console.log(`Listening on localhost: ${port}`));