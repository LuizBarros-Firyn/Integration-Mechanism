import { Router } from 'express';

import SellerController from '../controllers/SellerController';

import JwtAuth from '../services/JwtAuth';

const sellerRoutes = Router();

sellerRoutes.use(JwtAuth);

sellerRoutes.get('/', SellerController.find);

export default sellerRoutes;
