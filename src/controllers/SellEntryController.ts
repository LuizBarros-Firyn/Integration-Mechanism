import { Request, Response } from 'express';

import { SellsEntry } from '../models';

const SellsEntryController = {
  find: async (req: Request, res: Response): Promise<Response> => {
    const sellEntries = await SellsEntry.findMany();

    return res.json(sellEntries);
  }
};

export default SellsEntryController;
