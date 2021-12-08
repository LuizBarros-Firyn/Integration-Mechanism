"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const DataSourceController = {
    find: async (req, res) => {
        const dataSources = await models_1.DataSource.findMany();
        return res.json(dataSources);
    }
};
exports.default = DataSourceController;
