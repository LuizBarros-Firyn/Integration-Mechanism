import { Request, Response } from 'express';

import { DataSource } from '../models';

const DataSourceController = {
  find: async (req: Request, res: Response): Promise<Response> => {
    const dataSources = await DataSource.findMany();

    return res.json(dataSources);
  }
};

export default DataSourceController;
