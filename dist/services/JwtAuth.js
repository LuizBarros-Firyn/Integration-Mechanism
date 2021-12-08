"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JwtSecret_1 = __importDefault(require("../config/JwtSecret"));
const JwtAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).send({ message: 'Acesso não autorizado' });
    }
    const parts = authorization.split(' ');
    if (parts.length !== 2)
        return res.status(401).send({ message: 'Erro no token' });
    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({ message: 'Token mal formatado' });
    return jsonwebtoken_1.default.verify(token, JwtSecret_1.default || 'test', (err, decoded) => {
        if (err || !decoded)
            return res.status(401).send({ message: 'Token inválido' });
        return next();
    });
};
exports.default = JwtAuth;
