/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import * as expressOasGenerator from 'express-oas-generator';
import { container } from './container'
import { InversifyExpressServer } from 'inversify-express-utils';
import './controllers/user.controller';
import { NormalizeApiResponses } from '@prodoctivity-dashboard/models';


const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
expressOasGenerator.init(app, {});

const port = process.env.port || 3333;
const server = new InversifyExpressServer(container, null, { rootPath: '/api' }, app);
server.setErrorConfig((app) => {
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(NormalizeApiResponses(null, 'Something broke!', '500'));
  });
});
server.build().listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
