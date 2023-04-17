import express, { Express } from 'express';

import helmet from 'helmet';

import moduleRoute from './routes/module.route';

import swaggerUi from 'swagger-ui-express';
import apiSpec from './utils/swagger.json';

const app: Express = express();

const port = process.env.PORT ?? 3000;

// JSON MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// ROUTES
app.use('/api/module', moduleRoute);

// SWAGGER
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(apiSpec));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
