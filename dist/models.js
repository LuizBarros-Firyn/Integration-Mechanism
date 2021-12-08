"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.SellsEntry = exports.Seller = exports.Product = exports.DataSourceModule = exports.DataSourceModuleType = exports.DataSourceField = exports.DataSource = exports.prisma = void 0;
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient({
    log: ['query', 'info', 'warn', 'error']
});
exports.DataSource = exports.prisma.dataSource, exports.DataSourceField = exports.prisma.dataSourceField, exports.DataSourceModuleType = exports.prisma.dataSourceModuleType, exports.DataSourceModule = exports.prisma.dataSourceModule, exports.Product = exports.prisma.product, exports.Seller = exports.prisma.seller, exports.SellsEntry = exports.prisma.sellsEntry, exports.User = exports.prisma.user;
