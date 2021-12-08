"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_1 = __importDefault(require("../controllers/ProductController"));
const JwtAuth_1 = __importDefault(require("../services/JwtAuth"));
const productRoutes = (0, express_1.Router)();
productRoutes.use(JwtAuth_1.default);
productRoutes.get('/', ProductController_1.default.find);
exports.default = productRoutes;
