import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import connectDatabase from './db/dbConfig.js';
import cookieParser from 'cookie-parser';
// Import Routes
import userRoutes from './routes/userRoutes/user.routes.js';
import projectRoutes from './routes/userRoutes/projectRoutes/project.routes.js';

connectDatabase();

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Dummy Route
app.get('/', (req, res) => {
    res.send('Hello, BAARSS_Bot!');
});

// Routes
// User routes
app.use('/api/users', userRoutes);
// Project routes
app.use('/api/projects', projectRoutes);

export default app;