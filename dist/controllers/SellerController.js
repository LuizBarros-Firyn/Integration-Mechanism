"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const SellerController = {
    find: async (req, res) => {
        const sellers = await models_1.Seller.findMany();
        return res.json(sellers);
    }
};
exports.default = SellerController;
