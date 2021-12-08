import { Router } from 'express';

import DataSourceController from '../controllers/DataSourceController';

import JwtAuth from '../services/JwtAuth';

const dataSourceRoutes = Router();

dataSourceRoutes.use(JwtAuth);

dataSourceRoutes.get('/', DataSourceController.find);

export default dataSourceRoutes;
