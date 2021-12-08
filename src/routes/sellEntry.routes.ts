import { Router } from 'express';

import SellEntryController from '../controllers/SellEntryController';

import JwtAuth from '../services/JwtAuth';

const sellEntryRoutes = Router();

sellEntryRoutes.use(JwtAuth);

sellEntryRoutes.get('/', SellEntryController.find);

export default sellEntryRoutes;
