"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const UtilityServices_1 = require("../services/UtilityServices");
const JwtSignService_1 = __importDefault(require("../services/JwtSignService"));
const SessionController = {
    create: async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password || email.length < 5)
            return res.status(400).send({ message: 'E-mail ou senha inválido' });
        const user = await models_1.User.findFirst({
            where: {
                email: {
                    equals: email,
                    mode: 'insensitive'
                },
                password: (0, UtilityServices_1.Sha3Factory)(password)
            }
        });
        if (!user)
            return res.status(404).send({ message: 'Usuário ou senha incorreta' });
        const claims = {
            id: user.id,
            email: user.email,
            name: user.name
        };
        const authorizationKey = (0, JwtSignService_1.default)(claims);
        return res.json({ authorizationKey });
    }
};
exports.default = SessionController;
