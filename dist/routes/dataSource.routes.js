"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DataSourceController_1 = __importDefault(require("../controllers/DataSourceController"));
const JwtAuth_1 = __importDefault(require("../services/JwtAuth"));
const dataSourceRoutes = (0, express_1.Router)();
dataSourceRoutes.use(JwtAuth_1.default);
dataSourceRoutes.get('/', DataSourceController_1.default.find);
exports.default = dataSourceRoutes;
