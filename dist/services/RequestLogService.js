"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RequestLogService = (req, res, next) => {
    const { method, url } = req;
    const logLabel = `[${method.toUpperCase()}] ${url}`;
    console.time(logLabel);
    next();
    console.timeEnd(logLabel);
    console.log('============================================================');
};
exports.default = RequestLogService;
