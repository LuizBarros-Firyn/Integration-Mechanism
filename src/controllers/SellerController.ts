import { Request, Response } from 'express';

import { Seller } from '../models';

const SellerController = {
  find: async (req: Request, res: Response): Promise<Response> => {
    const sellers = await Seller.findMany();

    return res.json(sellers);
  }
};

export default SellerController;
