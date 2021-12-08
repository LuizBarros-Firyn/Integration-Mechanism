"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SellEntryController_1 = __importDefault(require("../controllers/SellEntryController"));
const JwtAuth_1 = __importDefault(require("../services/JwtAuth"));
const sellEntryRoutes = (0, express_1.Router)();
sellEntryRoutes.use(JwtAuth_1.default);
sellEntryRoutes.get('/', SellEntryController_1.default.find);
exports.default = sellEntryRoutes;
