import express from 'express';
import { errorHandler } from '../../middlewares/errorHandler';
import swaggerUi from 'swagger-ui-express';

import swaggerDocs from '../swagger.json';
import { urlRouter } from './routes/urlRoutes';

const app = express();

const swaggerOpts = {
    explorer: true
}

app.use(express.json());
app.use(urlRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, swaggerOpts))
app.use(errorHandler);

export default app;
