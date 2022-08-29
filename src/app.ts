import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { AppRouter } from './routes/routes';

dotenv.config();

const app = express();

app.use(morgan('dev'));

mongoose.connect(process.env.DB_URL as string, async ()=>{
    console.log('Database connection successfull')
});

app.use('/', AppRouter);

app.listen(parseInt(process.env.PORT as string), ()=>{
    console.log(`App started on Port ${process.env.PORT}`)
}); 