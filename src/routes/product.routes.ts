import { Router } from 'express';

import ProductController from '../controllers/ProductController';

import JwtAuth from '../services/JwtAuth';

const productRoutes = Router();

productRoutes.use(JwtAuth);

productRoutes.get('/', ProductController.find);

export default productRoutes;
