import { Request, Response } from 'express';

import { Product } from '../models';

const ProductController = {
  find: async (req: Request, res: Response): Promise<Response> => {
    const products = await Product.findMany();

    return res.json(products);
  }
};

export default ProductController;
