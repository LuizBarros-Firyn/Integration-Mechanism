"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SellerController_1 = __importDefault(require("../controllers/SellerController"));
const JwtAuth_1 = __importDefault(require("../services/JwtAuth"));
const sellerRoutes = (0, express_1.Router)();
sellerRoutes.use(JwtAuth_1.default);
sellerRoutes.get('/', SellerController_1.default.find);
exports.default = sellerRoutes;
