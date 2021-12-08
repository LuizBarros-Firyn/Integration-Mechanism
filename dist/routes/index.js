"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const seller_routes_1 = __importDefault(require("./seller.routes"));
const product_routes_1 = __importDefault(require("./product.routes"));
const sellEntry_routes_1 = __importDefault(require("./sellEntry.routes"));
const dataSource_routes_1 = __importDefault(require("./dataSource.routes"));
const session_routes_1 = __importDefault(require("./session.routes"));
const routes = (0, express_1.Router)();
routes.use('/sellers', seller_routes_1.default);
routes.use('/products', product_routes_1.default);
routes.use('/sell_entries', sellEntry_routes_1.default);
routes.use('/data_sources', dataSource_routes_1.default);
routes.use('/sessions', session_routes_1.default);
routes.get('/', (req, res) => res.json({ message: 'Hello!' }));
exports.default = routes;
