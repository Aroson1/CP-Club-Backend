import express from 'express';
import 'express-async-errors';

import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';
import session from 'express-session';
import passport from './config/passport.js';

import { badJsonHandler, notFoundHandler, errorHandler } from './middlewares/index.js';
import { Logger } from './config/logger.js';
import { swaggerSpec } from './config/swagger-config.js';
import { generateSpecs } from './utils/generate-api-specs.js';


import healthRoute from './routes/health.route.js';
import v1Routes from './routes/v1/index.js';

const logger = Logger(fileURLToPath(import.meta.url));

const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(morgan(
  'combined',
  {
    write(message) {
      logger.info(message.substring(0, message.lastIndexOf('\n')));
    },
    skip() {
      return process.env.NODE_ENV === 'test';
    },
  },
));


app.use(badJsonHandler);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,

  customCssUrl:
  'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.1/themes/3.x/theme-material.css',
}));

app.use('/health', healthRoute);

// v1 api routes
app.use('/v1', v1Routes);

// handle 404 not found error
app.use(notFoundHandler);

// catch all errors
app.use(errorHandler);

// generate swagger API specifications in yaml format
generateSpecs();

export default app;
