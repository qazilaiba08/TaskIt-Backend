import express from 'express';
import cors from 'cors';
import connectToDb from './config/db.js';
import rourter from './routes/authRoutes.js';
import path from 'path';

const app = express();
const port = process.env.PORT || 5001;

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'https://trackweb-virid.vercel.app/'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));


app.use(express.json());
connectToDb();

const __dirname = path.resolve();

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'dist')));


app.use('/api',rourter)


app.listen(port, () => {
    console.log(`🚀 Example app listening on port ${port}`)
  })
