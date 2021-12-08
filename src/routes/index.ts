import { Router } from 'express';

import sellerRoutes from './seller.routes';
import productRoutes from './product.routes';
import sellEntryRoutes from './sellEntry.routes';
import dataSourceRoutes from './dataSource.routes';
import sessionRoutes from './session.routes';

const routes = Router();

routes.use('/sellers', sellerRoutes);
routes.use('/products', productRoutes);
routes.use('/sell_entries', sellEntryRoutes);
routes.use('/data_sources', dataSourceRoutes);
routes.use('/sessions', sessionRoutes);

routes.get('/', (req, res) => res.json({ message: 'Hello!' }));

export default routes;
