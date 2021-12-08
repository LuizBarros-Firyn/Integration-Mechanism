"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const ProductController = {
    find: async (req, res) => {
        const products = await models_1.Product.findMany();
        return res.json(products);
    }
};
exports.default = ProductController;
