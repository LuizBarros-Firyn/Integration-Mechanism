"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const SellsEntryController = {
    find: async (req, res) => {
        const sellEntries = await models_1.SellsEntry.findMany();
        return res.json(sellEntries);
    }
};
exports.default = SellsEntryController;
