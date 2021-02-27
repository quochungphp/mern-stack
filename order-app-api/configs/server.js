import express from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import connectionFactory from './database/connectionFactory.js'
import expressValidator from 'express-validator'
import appRouter from '../routes/index.js'
import services from '../services/utils'

global.__utils = new services.utils();

export default function () {
  const server = express();

  const initialConnection = () => {
    // Initial mongodb connection
    connectionFactory.Mongo();
  };
  const initialMiddleware = () => {
    // add middleware to parse the json
    server.use(json());
    server.use(cookieParser());
    server.use(
      urlencoded({
        extended: true
      })
    );
    // Allow CORS for domain
    const corsOptions = {
      origin: ['http://localhost:3000'],
      allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'contentType',
        'Content-Type',
        'Accept',
        'Authorization',
        'Access-Control-Allow-Origin',
        'Cache-Control',
        'Expires',
        'Pragma'
      ],
      credentials: true,
      optionsSuccessStatus: 200,
      methods: 'GET,HEAD,POST,PATCH,DELETE,OPTIONS,PUT'
    };
    server.use(cors(corsOptions));
    server.use(helmet());
    server.use(expressValidator())
    server.use(function (req, res, next) {
      res.header('Content-Type', 'application/json;charset=UTF-8');
      next();
    });
  };
  const create = (config) => {
    const env = process.env
    // set all the server things
    server.set('env', env.NODE_ENV);
    server.set('port', env.PORT);
    server.set('hostname', env.HOST);

    // Initial global middleware
    initialMiddleware();

    // Set up database connection
    initialConnection();

    // Register router
    server.use('/', appRouter);
  };

  // Staring Express js net server
  const start = () => {
    const hostname = server.get('hostname');
    const port = server.get('port');

    server.listen(port, function () {
      // delete all stored connection sdc network socket if nodejs process terminated
      console.log(`Express server listening on - http:// ${hostname}:${port} - ${process.env.NODE_ENV}`);
    });
  };

  return {
    create: create,
    start: start
  };
}
