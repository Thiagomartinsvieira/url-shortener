// app.ts

import express from 'express';
import urlRoutes from './routes/urlRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use('/', urlRoutes);
app.use(errorHandler);

export default app;
